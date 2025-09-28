import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import FormContainer from "../../shared/form/FormContainer";
import Input from "../../shared/form/Input";
import Error from "../../shared/Error";
import { Button, Text } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";

import EasyButton from "../../shared/StyledComponents/EasyButton";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    const user = {
      email: email,
      name: name,
      phone: phone,
      password: password,
      isAdmin: false,
    };
    if (email === "" || password === "" || name === "" || phone === "") {
      setError("Please fill in the form correctly");
    } else {
      setError();
      console.log("success");
    }

    console.log(user);
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      enableOnAndroid={true}
      extraHeight={200}
      style={{ backgroundColor: "white" }}
    >
      <FormContainer title="Register">
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone"}
          name={"phone"}
          id={"phone"}
          value={phone}
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <EasyButton primary large onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
        <View style={styles.buttonGroup}>
          <EasyButton secondary large onPress={() => props.navigation.navigate("Login")}>
            <Text style={{ color: "white" }}> Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
 
});

export default Register;
