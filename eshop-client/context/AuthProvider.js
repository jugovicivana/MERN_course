import React, { useEffect, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./reducers/Auth.reducer";
import { setCurrentUser } from "./actions/Auth.actions";
import AuthContext from "./AuthContext";

const initialState = {
  isAuthenticated: null,
  user: {},
  userProfile: {},
};

const AuthProvider = ({ children }) => {
  const [stateUser, dispatch] = useReducer(authReducer, initialState);
  const [showChild, setShowChild] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load token on mount
  useEffect(() => {
    (async () => {
      try {
        setShowChild(true);
        const token = await AsyncStorage.getItem("jwt");
        if (token) {
          const decoded = jwtDecode(token);
          if (setShowChild) dispatch(setCurrentUser(decoded));
        }
      } catch (err) {
        console.log("Error loading token", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return null; // ili splash screen dok učitava token
  }

  return (
    <AuthContext.Provider value={{ stateUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
