import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppTextInput({ icon, width = "100%", costumStyle, ...otherProps }) {
  return (
    <View style={[styles.container]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color="#fff"
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={"#C4C4C4"}
        style={{
          color: "black",
          alignContent: "center",
          justifyContent: "center",
        }}
        width="100%"
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    marginVertical: 0,
    width: "80%",
    backgroundColor: "#D4D4D4",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
