import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const SingleReplies = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "90%",
        alignSelf: "flex-end",
      }}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: "https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.displayName}>Elona</Text>
        <Text>{item.text}</Text>
        <Text style={{ opacity: 0.4 }}>22 hr ago</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <AntDesign name="heart" size={24} color={"grey"} />

        <Text>{item.likes}</Text>
      </View>
    </View>
  );
};

export default SingleReplies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "center",
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.1)",
  },
  mainComment: {
    flexDirection: "row",
  },
  replies: {},
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  textContainer: {
    marginHorizontal: 14,
    flex: 1,
  },
  displayName: {
    color: "gray",
    fontSize: 13,
  },
});
