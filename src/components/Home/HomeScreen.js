import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { useFonts } from "expo-font";
import * as Icon from "react-native-feather";

import itFlag from "../../../assets/flags/italia.png";
import esFlag from "../../../assets/flags/espana.png";
import arFlag from "../../../assets/flags/argentina.png";
import geFlag from "../../../assets/flags/germany.png";

import banner from "../../../assets/banner.jpg";

import cardNetherlands from "../../../assets/cardsImages/deftHolanda.jpg";
import cardArgentina from "../../../assets/cardsImages/obeArgentina.jpg";
import cardGermany from "../../../assets/cardsImages/germany.jpg";
import cardSidney from "../../../assets/cardsImages/sidney.jpg";
import cardSpain from "../../../assets/cardsImages/spain.jpg";
import cardItaly from "../../../assets/cardsImages/venezia.jpg";
import { width } from "dom-helpers";

const HomeScreen = () => {
  let [fontsLoaded] = useFonts({
    "OpenSans-light": require("../../../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-semiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [contries, setContries] = useState([
    {
      flag: itFlag,
      name: "Italy",
    },
    {
      flag: esFlag,
      name: "Spain",
    },
    {
      flag: arFlag,
      name: "Argentina",
    },
    {
      flag: geFlag,
      name: "Germany",
    },
  ]);

  const [sites, setSites] = useState([
    {
      site: cardNetherlands,
    },
    {
      site: cardArgentina,
    },
    {
      site: cardGermany,
    },
    {
      site: cardSidney,
    },
    {
      site: cardSpain,
    },
    {
      site: cardItaly,
    },
  ]);

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Home</Text>
            <Icon.User stroke="#000" width={23} height={23} />
          </View>
          <View>
            <Text style={styles.textContries}>Filter by contries</Text>
            <View style={styles.contriesContainer}>
              {contries.map((item) => (
                <TouchableOpacity>
                  <View style={styles.countriesCard}>
                    <Image source={item.flag} style={styles.flags} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <ImageBackground
              source={banner}
              resizeMode="stretch"
              style={styles.bannerImg}
            >
              <View style={styles.textContainer}>
                <Text style={styles.bannerText}>Italy</Text>
                <Text style={styles.bannerSubtext}>Rome</Text>
              </View>
            </ImageBackground>

            <View style={styles.sitesContainer}>
              <Text style={styles.sitesText}>Sites to visit</Text>
              <View style={styles.cardsToVisit}>
                {sites.map((item) => (
                  <ImageBackground
                    source={item.site}
                    style={styles.cardsImages}
                    borderRadius={10}
                    resizeMode="cover"
                  >
                    <TouchableOpacity>
                      <View style={styles.detailsContainer}>
                        <Icon.Plus stroke="#F2F4F3" width={23} height={23} />
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    marginBottom: "5%",
  },
  titleText: {
    color: "black",
    fontFamily: "OpenSans-semiBold",
    fontSize: 26,
    paddingRight: "65%",
  },
  contriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: '5%'
  },
  countriesCard: {
    backgroundColor: "rgba(247, 249, 247, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(122, 125, 125, 0.5)",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textContries: {
    padding: "5%",
    fontFamily: "OpenSans-semiBold",
    fontSize: 16,
  },
  flags: {
    resizeMode: "cover",
    width: 30,
    height: 30,
  },
  bannerContainer: {
    resizeMode: "contain",
    justifyContent: "center",
    height: "80%",
    width: "100%",
  },
  bannerImg: {
    resizeMode: "cover",
    overflow: "hidden",
    height: 130,
    marginTop: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.36,
    shadowRadius: 5.46,
    elevation: 9,
  },
  textContainer: {
    alignItems: "flex-start",
  },
  bannerText: {
    fontFamily: "OpenSans-semiBold",
    fontSize: 24,
    color: "#F2F4F3",
  },
  bannerSubtext: {
    fontFamily: "OpenSans-regular",
    fontSize: 18,
    color: "#F2F4F3",
  },
  sitesContainer: {
    marginVertical: "5%",
  },
  sitesText: {
    fontFamily: "OpenSans-semiBold",
    fontSize: 18,
    padding: "5%",
  },
  cardsToVisit: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardsImages: {
    width: 160,
    height: 100,
    borderRadius: 10,
    margin: "3%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.46,
    elevation: 9,
  },
  detailsContainer: {
    backgroundColor: "rgba(53, 56, 49, .8)",
    width: 25,
    borderRadius: 5,
  },
});

export default HomeScreen;
