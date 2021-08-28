import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import { useFonts } from "expo-font";
import * as Icon from "react-native-feather";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "OpenSans-light": require("../../../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-semiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [showPass, setShowPass] = useState(true);
  const [userImage, setUserImage] = useState(null);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    async function image() {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Permissons denied!");
        }
      }
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.backOption}
              onPress={() => navigation.push("Login")}
            >
              <Icon.ArrowLeftCircle
                stroke="#462255"
                fill="#fff"
                width={35}
                height={40}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Register</Text>
          </View>
        </View>

        <ImageBackground
          style={styles.ImageBackground}
          source={require("../../../assets/system-cuate.png")}
        >
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imagePickerCont}>
              <Text style={{ top: 40, color: "#fff" }}>Pick an image</Text>

              {userImage && (
                <Image
                  source={{ uri: userImage }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 180,
                    bottom: 20,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={{ top: "1%", left: "10%" }}>
            <Text style={styles.emailText}>Email</Text>
            <View style={styles.emailInput}>
              <TextInput placeholder="Email" />
            </View>

            <Text style={styles.emailText}>Name</Text>
            <View style={styles.emailInput}>
              <TextInput placeholder="Name" />
            </View>

            <Text style={styles.emailText}>Last name</Text>
            <View style={styles.emailInput}>
              <TextInput placeholder="Last name" />
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
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
  },
  headerContainer: {
    height: "20%",
    backgroundColor: "#462255",
    justifyContent: "center",
    borderBottomEndRadius: 100,
  },
  titleContainer: {
    top: 15,
    flexDirection: "row",
  },
  backOption: {
    paddingRight: "22%",
    paddingLeft: "5%",
  },
  title: {
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontSize: 26,
    color: "#F2F4F3",
  },
  ImageBackground: {
    height: "85%",
    top: "5%",
  },
  imagePicker: {
    justifyContent: "center",
  },
  imagePickerCont: {
    alignItems: "center",
    backgroundColor: "rgba(	70, 34, 85,0.8)",
    height: 100,
    width: 100,
    borderRadius: 180,
    left: "38%",
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
    fontFamily: "OpenSans-bold",
    width: "80%",
    alignItems: "center",
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
    top: "5%",
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: "10%",
    paddingVertical: 14,
    backgroundColor: "#462255",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "OpenSans-bold",
    color: "#F2F4F3",
  },
});

export default RegisterScreen;
