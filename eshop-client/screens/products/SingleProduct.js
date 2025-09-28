import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { View, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import TrafficLight from "../../shared/StyledComponents/TrafficLight";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return ()=>{
      setAvailability(null);
      setAvailabilityText("");
    }
  }, []);
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
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{marginRight:10}}> Availability: {availabilityText}</Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View>
          <EasyButton
            primary
            medium
            onPress={() => {
              dispatch(addToCart({ quantity: 1, product: item }));
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${item.name} added to Cart`,
                text2: "Go to your cart to complete order",
              });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
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
  availabilityContainer:{
    marginBottom:20,
    alignItems:'center',
  },
  availability:{
    flexDirection:'row',
    marginBottom:10
  }
});

export default SingleProduct;
