import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { IconSymbol } from "@components/ui/IconSymbol";
import { useThemeColor } from "@hooks/UseThemeColor";

type Props = {
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  iconLeft?: React.ComponentProps<typeof IconSymbol>["name"];
};

export function RowItem({ label, value, onPress, danger, iconLeft }: Props) {
  const border = useThemeColor({}, "icon");
  const tint = useThemeColor({}, "tint");

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.row,
        { borderColor: border, opacity: pressed ? 0.75 : 1 },
        !onPress && styles.disabled,
      ]}
    >
      <View style={styles.left}>
        {iconLeft ? (
          <View style={styles.leftIcon}>
            <IconSymbol
              name={iconLeft}
              size={18}
              color={danger ? "#ef4444" : tint}
            />
          </View>
        ) : null}

        <View style={{ flex: 1 }}>
          <ThemedText style={[styles.label, danger && styles.danger]}>
            {label}
          </ThemedText>
          {value ? <ThemedText style={styles.value}>{value}</ThemedText> : null}
        </View>
      </View>

      {onPress ? (
        <IconSymbol name="chevron.right" size={18} color={tint} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 52,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  disabled: {
    opacity: 0.85,
  },
  left: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },
  leftIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
  },
  value: {
    marginTop: 2,
    fontSize: 12,
    opacity: 0.7,
  },
  danger: {
    color: "#ef4444",
  },
});
