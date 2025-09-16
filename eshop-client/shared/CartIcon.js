import React from "react";
import { StyleSheet } from "react-native";
import { Text, Badge } from "react-native-paper";

import { useSelector } from "react-redux"; //da imamo pristup store-u

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cartItems.items);

  return (
    <>
      {cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{cartItems.length}</Text>
        </Badge>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 20,
    height:20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top:-10,
    right:-15,
    backgroundColor:'#f9bf85ff',
  },
  text: {
    fontSize:12,
    width:100,
    fontWeight:'bold',
    color:'white'
  },
});

export default CartIcon;
