import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";

export function SectionHeader({ title }: { title: string }) {
  return <ThemedText style={styles.title}>{title}</ThemedText>;
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.9,
  },
});
