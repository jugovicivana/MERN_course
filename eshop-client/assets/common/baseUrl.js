import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android"
    ? "http://192.168.1.3:3000/api/v1/"
    : "http://localhost:3000/api/v1/";

export default baseURL;
