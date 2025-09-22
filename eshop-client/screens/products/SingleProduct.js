import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { Appbar, Searchbar, IconButton, Text } from "react-native-paper";
import SearchedProduct from "./SearchedProducts";
import { MD3Colors } from "react-native-paper";
import Banner from "../../shared/Banner";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri:
                item.image && item.image.length > 0
                  ? item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text variant="headlineLarge" style={styles.contentHeader}>
            {item.name}
          </Text>
          <Text variant="bodyMedium" style={styles.contentText}>
            {item.brand}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View>
          <Button
            onPress={() => {
              dispatch(addToCart({ quantity: 1, product: item }));
            }}
          >
            Add
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    backgroundColor: "white",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  contentText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});

export default SingleProduct;
