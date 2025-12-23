import React from "react";
import { ThemedText } from "@components/ThemedText";

export function SectionHeader({ title }: { title: string }) {
	return <ThemedText className="mt-4 mb-2 opacity-[0.9]">{title}</ThemedText>;
}
