import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper"; // Paper
import { Avatar } from "react-native-paper";
import { MD3Colors } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        width: width,
        backgroundColor: "#FAF9EE",
        paddingBottom:50
      }}
      keyboardShouldPersistTaps="handled" // <--- ovo je ključno

    >
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
         
            <Card
              style={[styles.card, { padding: 0, margin: 0 }]}
              key={item._id?.$oid || item._id}
              onPress={() => {
                props.navigation.navigate("Product Detail", { item: item });
                //console.log("IVANA");
              }}
            >
              <Card.Content style={{padding:0, margin:0}}>
              <View style={styles.row}>
                <Avatar.Image
                  source={{
                    uri: item.image
                      ? item.image
                      : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                  }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text variant="titleMedium">{item.name}</Text>
                  <Text variant="bodyMedium">{item.description}</Text>
                </View>
              </View>
              </Card.Content>
            </Card>
        ))
      ) : (
        <View style={[styles.center, { padding: 20 }]}>
          <Text>No products match the selected criteria</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3Colors.tertiary70,
    borderRadius: 25,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: MD3Colors.tertiary70,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});

export default SearchedProduct;
