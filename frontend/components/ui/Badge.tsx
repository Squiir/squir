export function Badge({
  text,
  variant,
}: {
  text: string;
  variant?: "ok" | "warn";
}) {
  const bg =
    variant === "warn" ? "rgba(255, 200, 0, 0.18)" : "rgba(90, 200, 120, 0.18)";
  const border =
    variant === "warn"
      ? "rgba(255, 200, 0, 0.35)"
      : "rgba(90, 200, 120, 0.35)";
  const color =
    variant === "warn"
      ? "rgba(255, 220, 120, 1)"
      : "rgba(170, 255, 200, 1)";

  return (
    <View
      style={{
        minWidth: 40,
        height: 24,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: border,
        alignItems: "center", 
        justifyContent: "center", 
      }}
    >
      <Text style={{ color, fontSize: 11, fontWeight: "900", lineHeight: 12 }}>
        {text}
      </Text>
    </View>
  );
}