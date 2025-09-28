import React from "react";
import { Image, Text, Dimensions, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import EasyButton from "../../shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");
const ProductCard = (props) => {
  const { id, name, price, image, countInStock } = props;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />

      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>

      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <EasyButton
            primary
            medium
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={() => {
              dispatch(addToCart({ quantity: 1, product: props }));
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${name} added to Cart`,
                text2: "Go to your cart to complete order",
              });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    // marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 0,
    backgroundColor: "white",
    borderColor: "#FFDBB6",
    borderWidth: 1,
  },
  // image: {
  //   width: width / 2 - 20 - 10,
  //   height: width / 2 - 20 - 30,
  //   backgroundColor: "transparent",
  //   position: "absolute",
  //   top: -45,
  // },
  //  imageContainer: {
  //   width: '100%',
  //   height: width / 2 - 20 - 30,
  //   borderRadius: 10,
  //   overflow: 'hidden', // bitno da slika ne izlazi vani
  //   backgroundColor: '#f5f5f5', // opcionalno
  //   marginBottom: 10,
  // },
  image: {
    width: "100%",
    height: 100,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    width: width / 2 - 20 - 10,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
export default ProductCard;
