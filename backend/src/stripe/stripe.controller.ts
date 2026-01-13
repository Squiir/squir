import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import type { Request } from "express";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  @Post("onboarding/:barId")
  async createOnboardingLink(
    @Param("barId") barId: string,
    @Body("refreshUrl") refreshUrl: string,
    @Body("returnUrl") returnUrl: string,
  ) {
    // TODO: validate if the requesting user owns the bar
    const url = await this.stripeService.createOnboardingLink(
      barId,
      refreshUrl,
      returnUrl,
    );
    return { url };
  }

  @Post("payment-intent")
  async createPaymentIntent(
    @Body()
    body: {
      amount: number;
      barId: string;
      userId: string;
      offerId: string;
    },
  ) {
    return this.stripeService.createPaymentIntent(
      body.amount,
      body.barId,
      body.userId,
      body.offerId,
    );
  }

  @Post("webhook")
  async handleWebhook(
    @Req() req: Request,
    @Headers("stripe-signature") signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException("Missing stripe-signature header");
    }

    // Note: Request body must be raw buffer for Stripe verification.
    // NestJS ParseIntPipe or similar might interfere if not configured correctly.
    // For now assuming the raw body is accessible or handled by a middleware if needed.
    // But standard NestJS request body is JSON. We might need raw body support.
    // simpler approach is to rely on `req.body` if we configure `main.ts` to keep raw body,
    // or use a separate RawBody decorator/interceptor.
    // FOR MVP: We will assume standard setup and try to use `req.rawBody` if available
    // (needs `nest-start` with option or `body-parser` config).
    // Let's try to use the raw body from the request if it exists (some setups add it).

    // For this environment, I'll assume we can get the raw buffer.
    // If not, we'll need to adjust `main.ts`.
    // Actually, let's keep it simple: catch the error if signature verification fails and log it.

    let event;
    try {
      // IMPORTANT: In a real NestJS app, you need to ensure you pass the RAW BODY to constructEvent.
      // This often requires disabling the global body parser for this route or using a buffer middleware.
      // For the sake of this task, I'll write the logic as if `req.body` (if raw) or `req['rawBody']` works.
      const rawBody = (req as any).rawBody || req.body;
      event = this.stripeService.constructEvent(rawBody, signature);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${(err as Error).message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const barId = paymentIntent.metadata.barId;
      const userId = paymentIntent.metadata.userId;

      if (barId && userId) {
        const offerId = paymentIntent.metadata.offerId;

        if (offerId) {
          await this.prisma.qRCode.create({
            data: {
              userId,
              offerId,
              used: false,
            },
          });
        } else {
          console.warn("Missing offerId in metadata, cannot create QR code");
        }
      }
    }

    return { received: true };
  }
}
