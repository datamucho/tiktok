import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQuery } from "react-query";
import { useFetch, usePost } from "./api/useFetch";
import SingleReplies from "./SingleReplies";

const SingleComment = ({ item, setParent_comment_id }) => {
  const [showReps, setShowReps] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const { data, status } = useQuery(["childComments", item.id], () =>
    useFetch("GET", `comments/${item.video_id}/${item.id}`)
  );

  const { mutate: handleLike } = useMutation(
    (id) => usePost("POST", `comment/${id}/like`),
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (res) => {
        console.log("succes", res);
      },
    }
  );

  const { mutate: handleUnlike } = useMutation(
    (id) => usePost("POST", `comment/${id}/unlike`),
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (res) => {
        console.log("succes", res);
      },
    }
  );

  const onLike = (id) => {
    setIsLike((prevState) => !prevState);
    if (isLike) {
      handleUnlike(id);
    } else {
      handleLike(id);
    }
  };
  return (
    <TouchableOpacity onPress={() => setParent_comment_id(item.id)}>
      <View style={styles.container}>
        <View style={styles.mainComment}>
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
            <TouchableWithoutFeedback
              onPress={() => setShowReps((prevState) => !prevState)}
            >
              <Text style={{ opacity: 0.4, margin: 5 }}>
                {showReps ? "Hide replies" : "View replies"} (4) {">"}{" "}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={() => onLike(item.id)}>
              <AntDesign
                name="heart"
                size={24}
                color={isLike ? "red" : "grey"}
              />
            </TouchableWithoutFeedback>

            <Text>{isLike ? item.likes + 1 : item.likes}</Text>
          </View>
        </View>
        {showReps && (
          <View style={styles.replies}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({ item }) => <SingleReplies item={item} />}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SingleComment;

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
