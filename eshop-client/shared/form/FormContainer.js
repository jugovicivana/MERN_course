import React from "react";

import { ScrollView, Dimensions, StyleSheet } from "react-native";

import { Text } from "react-native-paper";

var { width } = Dimensions.get("window");

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 10,
    // marginBottom: 400,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;
