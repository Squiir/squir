import { isEmail, registerDecorator, ValidationOptions } from "class-validator";

export function IsUsernameOrEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isUsernameOrEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string") return false;

          const isEmailFormat = isEmail(value);
          const isUsernameFormat = /^[a-zA-Z0-9_]{3,20}$/.test(value);

          return isEmailFormat || isUsernameFormat;
        },
        defaultMessage() {
          return "L'identifiant doit être un email valide ou un nom d'utilisateur (3-20 caractères)";
        },
      },
    });
  };
}
