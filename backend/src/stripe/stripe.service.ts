import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@prisma/prisma.service";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = this.configService.get<string>("STRIPE_SECRET_KEY");
    if (!secretKey) {
      console.warn("STRIPE_SECRET_KEY is not defined");
    }
    this.stripe = new Stripe(secretKey || "", {
      apiVersion: "2025-12-15.clover",
    });
  }

  async createExpressAccount(barId: string) {
    const account = await this.stripe.accounts.create({
      type: "express",
      country: "FR",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    await this.prisma.bar.update({
      where: { id: barId },
      data: { stripeAccountId: account.id },
    });

    return account;
  }

  async createOnboardingLink(
    barId: string,
    refreshUrl: string,
    returnUrl: string,
  ) {
    const bar = await this.prisma.bar.findUnique({ where: { id: barId } });
    let accountId = bar?.stripeAccountId;

    if (!accountId) {
      const account = await this.createExpressAccount(barId);
      accountId = account.id;
    }

    const accountLink = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding",
    });

    return accountLink.url;
  }

  async createPaymentIntent(
    amount: number,
    barId: string,
    userId: string,
    offerId: string,
  ) {
    const bar = await this.prisma.bar.findUnique({ where: { id: barId } });
    if (!bar || !bar.stripeAccountId) {
      throw new Error("Bar not found or not connected to Stripe");
    }

    const account = await this.stripe.accounts.retrieve(bar.stripeAccountId);
    if (account.capabilities?.transfers !== "active") {
      throw new Error(
        "The bar's Stripe account is not fully onboarded. Please complete the onboarding flow.",
      );
    }

    const applicationFeeAmount = Math.round(amount * 0.1);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: bar.stripeAccountId,
      },
      metadata: {
        barId: barId,
        userId: userId,
        offerId: offerId,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  constructEvent(payload: Buffer, signature: string) {
    const webhookSecret = this.configService.get<string>(
      "STRIPE_WEBHOOK_SECRET",
    );
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret!,
    );
  }
}
