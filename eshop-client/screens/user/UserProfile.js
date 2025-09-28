import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  Appbar,
  Searchbar,
  IconButton,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import { logoutUser } from "../../context/actions/Auth.actions";

const UserProfile = (props) => {
  const { stateUser, dispatch } = useAuth();
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      stateUser.isAuthenticated === false ||
      stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }

    setLoading(true);
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((response) => {
            setUserProfile(response.data);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return () => {
      setUserProfile();
      setLoading(true);
    };
  }, [stateUser.isAuthenticated]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            mode="contained-tonal"
            onPress={() => {
              AsyncStorage.removeItem("jwt");
              logoutUser(dispatch);
            }}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
   loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white'
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default UserProfile;
