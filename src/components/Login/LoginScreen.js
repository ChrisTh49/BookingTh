import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";
import * as Icon from "react-native-feather";
import firebase from "../../db/firebase";

const image = require("../../../assets/Booking-cuate.png");

const LoginScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "OpenSans-light": require("../../../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-semiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [showPass, setShowPass] = useState(true);
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const handleChangeText = (name, value) => {
    setUserState({ ...userState, [name]: value });
  };

  const loginUser = () => {
    firebase.auth
      .signInWithEmailAndPassword(userState.email, userState.password)
      .then(() => {
        navigation.push("Home");
        setUserState({
          name: "",
          password: "",
        });
      });
  };

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.TitleLogin}>Welcome {"\n"}to BookingTh!</Text>
        </View>
        <ImageBackground source={image} style={styles.ImageBackground}>
          <View style={styles.loginContainer}>
            <View style={styles.inputsContainer}>
              <Text style={styles.emailText}>Email</Text>
              <View style={styles.emailInput}>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Email"
                  onChangeText={(value) => handleChangeText("email", value)}
                />
              </View>
              <Text style={styles.emailText}>Password</Text>
              <View style={styles.emailInput}>
                <TextInput
                  style={{ width: "95%" }}
                  placeholder="Password"
                  secureTextEntry={showPass}
                  onChangeText={(value) => handleChangeText("password", value)}
                />
                <TouchableOpacity onPress={showPassword}>
                  {showPass === true ? (
                    <Icon.Eye
                      stroke="#462255"
                      fill="#fff"
                      width={21}
                      height={21}
                    />
                  ) : (
                    <Icon.EyeOff
                      stroke="#462255"
                      fill="#fff"
                      width={21}
                      height={21}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                You don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.push("Register")}>
                <Icon.Mail
                  stroke="#fff"
                  fill="#462255"
                  width={21}
                  height={21}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.touchableStyles}
                onPress={() => loginUser()}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    marginTop: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  TitleLogin: {
    fontFamily: "OpenSans-bold",
    fontSize: 35,
    color: "#462255",
  },
  ImageBackground: {
    resizeMode: "contain",
    justifyContent: "center",
    height: "80%",
    width: "100%",
  },
  loginContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
  },
  inputsContainer: {
    justifyContent: "center",
    left: '10%'
  },
  emailText: {
    fontFamily: "OpenSans-semiBold",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },
  emailInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "OpenSans-bold",
    width: "80%",
    paddingVertical: 8,
    borderColor: "#462255",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "rgba(242,244,243,0.6)",
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  touchableStyles: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: "25%",
    paddingVertical: 14,
    backgroundColor: "#462255",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "OpenSans-bold",
    color: "#F2F4F3",
  },
  registerContainer: {
    width: "88.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  registerText: {
    fontFamily: "OpenSans-bold",
    color: "#462255",
    fontSize: 12,
    letterSpacing: 0.2,
    paddingRight:  15
  },
});

export default LoginScreen;
