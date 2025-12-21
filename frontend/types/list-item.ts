import { ReactNode } from "react";
import { PressableProps } from "react-native";

export type ListItemProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
} & PressableProps;
