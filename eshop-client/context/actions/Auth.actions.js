import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const setCurrentUser = (decoded, user) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
  userProfile: user,
});

export const logoutUser = async (dispatch) => {
  await AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const loginUser = async (user, dispatch) => {
  try {
    const res = await fetch(`${baseURL}users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data?.token) {
      const token = data.token;
      await AsyncStorage.setItem("jwt", token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded, user));
    } else {
      await logoutUser(dispatch);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
      });
    }
  } catch (err) {
    console.log("Login error", err);
    await logoutUser(dispatch);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Please provide correct credentials",
    });
  }
};
