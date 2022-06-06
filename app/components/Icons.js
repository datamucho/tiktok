import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import AppText from "./AppText";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const Icons = ({ name, content, onPress, isLike, id }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => (id ? onPress(id) : onPress())}
      >
        {name === "comment" ? (
          <FontAwesome name="comment" size={24} color="white" />
        ) : (
          <AntDesign name={name} size={24} color={isLike ? "red" : "white"} />
        )}
      </TouchableOpacity>
      <AppText>{isLike ? content + 1 : content}</AppText>
    </>
  );
};

export default Icons;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 100,
  },
});
