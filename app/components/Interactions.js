import { Image, StyleSheet, View, Share } from "react-native";
import React from "react";
import Icons from "./Icons";

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "React Native | A framework for building native apps using React",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Interactions = ({ onCommentPress, item, onLike, isLike, id }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ borderRadius: 100, width: 50, height: 50 }}
        source={{ uri: item.author.image }}
      />

      <Icons
        name="heart"
        content={item.likes}
        onPress={onLike}
        isLike={isLike}
        id={item.id}
      />

      <Icons name="comment" content={item.comments} onPress={onCommentPress} />
      <Icons name="sharealt" content={item.shares} onPress={onShare} />
    </View>
  );
};

export default Interactions;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 25,
  },
});
