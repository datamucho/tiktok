import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";

const VideoDescription = () => {
  return (
    <View style={styles.container}>
      <AppText style={{ marginBottom: 10 }}>@Khaby Lame</AppText>
      <AppText style={{ marginBottom: 15 }}>
        We recently had a great project with Calvin Klein for which I got to
        design the logo - check it out! #SAP #AwesomeLogos
      </AppText>
    </View>
  );
};

export default VideoDescription;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 10,
    width: "80%",
  },
});
