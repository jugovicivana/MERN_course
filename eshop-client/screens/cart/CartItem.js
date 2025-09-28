import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, List, Avatar } from "react-native-paper";

const CartItem = (props) => {
  const data = props.item.product;
  const quantity = props.item.quantity;

  return (
    <List.Item
      style={styles.listItem}
      title={data.name}
      description={() => (
        <View style={styles.row}>
          <Text style={[styles.column, styles.price]}>
            ${data.price.toFixed(2)}
          </Text>
          <Text style={[styles.column, styles.quantity]}>{quantity}</Text>
          <Text style={[styles.column, styles.total]}>
            ${(data.price * quantity).toFixed(2)}
          </Text>
        </View>
      )}
      left={(props) => (
        <Avatar.Image
          {...props}
          size={50}
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listItem: { backgroundColor: "white" },
    row: {
      flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    // marginTop: 5,
    // paddingRight: 10,
  },
  column: {
    // flex: 1,
    flexWrap:'nowrap',
    textAlign: "center",
    fontSize: 14,
    marginHorizontal:5,
  },
});

export default CartItem;
