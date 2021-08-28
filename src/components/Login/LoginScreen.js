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

const image = require("../../../assets/Booking-cuate.png");

const LoginScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "OpenSans-light": require("../../../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-semiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [showPass, setShowPass] = useState(true);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.TitleLogin}>Welcome to {"\n"}BookingTh!</Text>
          <Text style={styles.subTitleLogin}>
            Choose the best place to chill out
          </Text>
        </View>
        <ImageBackground source={image} style={styles.ImageBackground}>
          <View style={styles.inputsContainer}>
            <Text style={styles.emailText}>Email</Text>
            <View style={styles.emailInput}>
              <TextInput placeholder="Email" />
            </View>
            <Text style={styles.emailText}>Password</Text>
            <View style={styles.emailInput}>
              <TextInput placeholder="Password" secureTextEntry={showPass} />
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
                  style={{ paddingLeft: '75%' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.touchableStyles}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
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
    position: "relative",
  },
  titleContainer: {
    alignItems: "center",
    height: "35%",
    backgroundColor: "#462255",
    justifyContent: "center",
    borderBottomEndRadius: 160,
  },
  TitleLogin: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "OpenSans-bold",
    fontSize: 30,
    color: "#F2F4F3",
  },
  subTitleLogin: {
    fontFamily: "OpenSans-semiBold",
    fontSize: 14,
    color: "#F2F4F3",
  },
  ImageBackground: {
    justifyContent: "center",
    height: "75%",
  },
  inputsContainer: {
    textAlign: "left",
    left: "10%",
    bottom: "13%",
  },
  emailText: {
    fontFamily: "OpenSans-semiBold",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },
  emailInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: "80%",
    left: "10%",
    top: "5%",
  },
  touchableStyles: {
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
    flexDirection: "row",
  },
  registerText: {
    fontFamily: "OpenSans-semiBold",
    fontSize: 12,
    letterSpacing: 0.2,
    marginBottom: 10,
  },
});

export default LoginScreen;
