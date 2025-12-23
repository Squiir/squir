import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";

export function IconSymbol({
	name,
	size = 24,
	color,
	textClassName,
	weight = "regular",
}: {
	name: SymbolViewProps["name"];
	size?: number;
	color: string;
	textClassName?: string;
	weight?: SymbolWeight;
}) {
	return (
		<SymbolView
			weight={weight}
			tintColor={color}
			resizeMode="scaleAspectFit"
			name={name}
			style={[
				{
					width: size,
					height: size,
				},
			]}
			className={textClassName}
		/>
	);
}
