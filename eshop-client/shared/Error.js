import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "#8b0000",
  },
});

export default Error;
