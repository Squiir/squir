import React from "react";
import { Pressable, View } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { IconSymbol } from "@components/ui/IconSymbol";
import { useThemeColor } from "@hooks/use-theme-color";

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
      style={({ pressed }) => {
        return { borderColor: border, opacity: pressed ? 0.75 : 1 };
      }}
      className={
        "min-h-[52px] py-2.5 px-2.5 rounded-[12px] border border-[0.4px] flex-row items-center justify-between mt-2.5" +
        (!onPress ? " opacity-85" : "")
      }
    >
      <View className="flex-row items-center gap-2.5 flex-1 pr-2">
        {iconLeft ? (
          <View className="w-[34px] h-[34px] rounded-[10px] items-center justify-center">
            <IconSymbol
              name={iconLeft}
              size={18}
              color={danger ? "#ef4444" : tint}
            />
          </View>
        ) : null}

        <View style={{ flex: 1 }}>
          <ThemedText
            className={"text-[15px]" + (danger ? " text-[#ef4444]" : "")}
          >
            {label}
          </ThemedText>
          {value ? (
            <ThemedText className="mt-[2px] text-[12px] opacity-70">
              {value}
            </ThemedText>
          ) : null}
        </View>
      </View>

      {onPress ? (
        <IconSymbol name="chevron.right" size={18} color={tint} />
      ) : null}
    </Pressable>
  );
}
