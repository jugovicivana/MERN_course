import React from "react";

import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect={props.autoCorrect}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    width: "100%",
    height: 60,
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f9bf85ff",
  },
});

export default Input;
