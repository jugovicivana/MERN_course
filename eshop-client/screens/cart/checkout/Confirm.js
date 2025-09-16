import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  Appbar,
  Card,
  List,
  RadioButton,
  Text,
  Button,
  Avatar,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slices/cartSlice";

var { width, height } = Dimensions.get("window");
const Confirm = (props) => {
  const confirm = props.route.params;
  const dispatch = useDispatch();
  const confirmOrder = () => {
    setTimeout(() => {
      dispatch(clearCart());
      props.navigation.navigate("Cart");
    }, 1000);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="titleLarge">Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "#f9bf85ff" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingAddress1}</Text>
              <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip Code: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => {
              return (
                <View style={styles.row}>
                  <Avatar.Image
                    source={{
                      uri: x.product.image
                        ? x.product.image
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                    style={styles.image}
                  />
                  <View style={styles.textContainer}>
                    <Text variant="titleMedium">{x.product.name}</Text>
                    <Text variant="bodyMedium">{x.quantity}</Text>
                    <Text variant="bodySmall">${x.product.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button onPress={() => confirmOrder()}>Place Order</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 1.2,
    padding: 5,
  },
  image: {
    // width: 40,
    // height: 40,
    // borderRadius: 8,
    // marginRight: 10,
    marginRight: 10,
  },
});
export default Confirm;
