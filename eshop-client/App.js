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
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Header />
            <Main />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9EE",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});
