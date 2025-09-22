// navigators/Main.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stack navigatori
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";


import CartIcon from "../shared/CartIcon";

const Tab = createBottomTabNavigator();

// Custom Tab Button da uklonimo ripple i centrira ikone
const CustomTabButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "#e91e63",
            tabBarInactiveTintColor:'grey',
            tabBarStyle: {
              height: 70,
              backgroundColor: "#FFFFFF",
              borderTopWidth: 0,
              elevation: 5,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
              ),
              tabBarButton: (props) => <CustomTabButton {...props} />,
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={styles.iconContainer}>
                  <Icon name="shopping-cart" color={color} size={26} />
                  <CartIcon />
                </View>
              ),
              tabBarButton: (props) => <CustomTabButton {...props} />,
            }}
          />
          <Tab.Screen
            name="Admin"
            component={HomeNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="cog" color={color} size={26} />
              ),
              tabBarButton: (props) => <CustomTabButton {...props} />,
            }}
          />
          <Tab.Screen
            name="User"
            component={UserNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="user" color={color} size={26} />
              ),
              tabBarButton: (props) => <CustomTabButton {...props} />,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Main;