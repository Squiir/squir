import { Pressable, Text } from "react-native";
import clsx from "clsx";
import { ButtonProps } from "@app-types/button";

export function Button({ title, onPress, variant = "primary" }: ButtonProps) {
  const bg =
    variant === "primary"
      ? "bg-blue-600"
      : variant === "danger"
      ? "bg-red-600"
      : "bg-gray-200 dark:bg-gray-700";

  const textColor =
    variant === "secondary" ? "text-black dark:text-white" : "text-white";

  return (
    <Pressable
      onPress={onPress}
      className={clsx("rounded-xl px-4 py-3 items-center", bg)}
    >
      <Text className={clsx("font-semibold", textColor)}>{title}</Text>
    </Pressable>
  );
}
