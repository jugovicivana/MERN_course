import { StatusBar, SafeAreaView } from "react-native";
import { StyleSheet, View, LogBox } from "react-native";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//navigators
import Main from "./navigators/Main";

//screens
import ProductContainer from "./screens/products/ProductContainer";
import Header from "./shared/Header";

//toast
import Toast from "react-native-toast-message";

//context API
import AuthProvider from "./context/AuthProvider";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5D688A",
    secondary: "yellow",
  },
};

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <Header />
              <Main />
              <Toast />
            </SafeAreaView>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4f7fbff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});
