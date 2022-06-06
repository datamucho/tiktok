import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import Screen from "./Screen";
import { LinearGradient } from "expo-linear-gradient";

const Navbar = ({ signOut }) => {
  return (
    <Screen style={styles.navbarScreen}>
      <LinearGradient
        colors={["rgba(0,0,0, 0.4)", "transparent"]}
        style={styles.boxWithShadow}
      />
      <View style={styles.navbar}>
        <Text style={styles.nbtext}>Recommended</Text>
        <View style={styles.verticleLine}></View>
        <Text style={[styles.nbtext, { opacity: 0.7 }]}>Following</Text>
        <TouchableWithoutFeedback onPress={signOut}>
          <Image
            source={require("../assets/images/notif.png")}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      </View>
    </Screen>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  navbarScreen: {
    position: "absolute",
    height: Dimensions.get("window").height + StatusBar.currentHeight,
    width: "100%",
  },
  boxWithShadow: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
  },
  nbtext: {
    fontFamily: "Inter-Black",
    marginVertical: 20,
    color: "#fff",
    fontSize: 17,
  },
  verticleLine: {
    height: "40%",
    width: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
  },
  image: { marginVertical: 20, width: 50, height: 50 },
});
