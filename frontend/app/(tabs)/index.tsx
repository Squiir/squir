import { Carousel } from "@components/ui/Carousel";
import { useGetOffers } from "@hooks/offer/use-get-offers";
import { Text, View } from "react-native";

export default function HomeScreen() {
	const { data: offers } = useGetOffers();

	return (
		<View>
			<Text>Home</Text>
			<Carousel title="Tendances"></Carousel>
		</View>
	);
}
