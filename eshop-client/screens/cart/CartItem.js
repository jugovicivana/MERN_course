import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, List, Avatar } from "react-native-paper";

const CartItem = (props) => {
  const data = props.item.product;
  const [quantity, setQuantity] = useState(props.item.quantity);

  return (
    <List.Item
      style={styles.listItem}
      title={data.name}
      left={(props) => (
        <Avatar.Image
          {...props}
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      )}
      right={(props) => (
        <View style={{ justifyContent: "center" }}>
          <Text style={{ alignSelf: "center", fontSize: 16 }}>
            ${data.price}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listItem: { backgroundColor: "white" },
});

export default CartItem;
