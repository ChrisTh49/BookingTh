import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from "react-native";

import { useFonts } from "expo-font";
import * as Icon from "react-native-feather";
import * as ImagePicker from "expo-image-picker";

import firebase from "../../db/firebase";

const getFirestoreRef = (path) => firebase.db.collection(path);

const RegisterScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "OpenSans-light": require("../../../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-semiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [showPass, setShowPass] = useState(true);
  const [userImage, setUserImage] = useState(null);

  const [userState, setUserState] = useState({
    name: "",
    email: "",
    lastName: "",
    password: "",
  });

  const handleChangeText = (name, value) => {
    setUserState({ ...userState, [name]: value });
  };

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

  const createUser = async () => {
    try {
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        userState.email,
        userState.password
      );
      if (user.uid) {
        await getFirestoreRef("users").doc(user.uid).set({
          email: userState.email,
          name: userState.name,
          lastName: userState.lastName,
          password: userState.password,
        });

        navigation.push("Home");
      } else {
        await getFirestoreRef("users").add(
          {
            email: userState.email,
            name: userState.name,
            lastName: userState.lastName,
            password: userState.password,
          },
          user.uid
        );

        navigation.push("Home");
      }
    } catch (error) {
      console.log(error);
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
              <TextInput
                placeholder="Email"
                onChangeText={(value) => handleChangeText("email", value)}
              />
            </View>

            <Text style={styles.emailText}>Name</Text>
            <View style={styles.emailInput}>
              <TextInput
                placeholder="Name"
                onChangeText={(value) => handleChangeText("name", value)}
              />
            </View>

            <Text style={styles.emailText}>Last name</Text>
            <View style={styles.emailInput}>
              <TextInput
                placeholder="Last name"
                onChangeText={(value) => handleChangeText("lastName", value)}
              />
            </View>

            <Text style={styles.emailText}>Password</Text>
            <View style={styles.emailInput}>
              <TextInput
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => createUser()}
              >
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
