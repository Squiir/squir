import { ReactNode } from "react";

export type ListItemProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onPress?: () => void;
};