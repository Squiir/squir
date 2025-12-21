import { PressableProps } from "react-native";

export type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "danger";
} & PressableProps;
