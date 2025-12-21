import { Platform } from "react-native";
import Constants from "expo-constants";

const host =
  Platform.OS === "web"
    ? "localhost"
    : Constants.expoConfig?.hostUri?.split(":")[0];

export const API_URL = `http://${host}:3000`;
