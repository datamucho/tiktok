import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleComment from "./SingleComment";
import { useMutation, useQuery } from "react-query";
import { useFetch, usePost } from "./api/useFetch";
import { FlatList } from "react-native-gesture-handler";

const CommentModal = ({ item }) => {
  const { data: comments, status } = useQuery(["comments", item.id], () =>
    useFetch("GET", `comments/${item.id}`)
  );

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [parent_comment_id, setParent_comment_id] = useState(null);

  useEffect(() => {
    if (comments) {
      setCommentList(comments);
    }
  }, [comments]);

  const { mutate: handleAddComment } = useMutation((params) => {
    return usePost(
      "POST",
      "comment/add",
      {
        text: params.comment,
        video_id: params.video_id,
        parent_comment_id: params.parent_comment_id,
      },
      {
        onError: (err) => {
          console.log(err);
        },
        onSuccess: (res) => {
          console.log("succes", res);
        },
      }
    );
  });

  const addComment = () => {
    if (comment.length == 0) return;
    const newCom = {
      id: item.video_id,
      likes: 0,
      parent_comment_id: parent_comment_id,
      text: comment,
      video_id: item.id,
    };
    handleAddComment({ comment, video_id: item.id, parent_comment_id });
    setCommentList((prevState) => [newCom, ...prevState]);
    setComment("");
  };
  const renderItem = ({ item }) => {
    return (
      <SingleComment item={item} setParent_comment_id={setParent_comment_id} />
    );
  };

  return (
    <>
      {commentList && (
        <FlatList
          data={commentList}
          keyExtractor={(item) => item?.text + item?.id}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      )}
      <View style={styles.containerInput}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
          }}
        />
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={() => addComment(item)}>
          <Ionicons name="arrow-up-circle" size={34} color={"crimson"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  container: {
    flex: 1,
  },
  containerInput: {
    padding: 10,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#ccc",
    flex: 1,
    borderRadius: 4,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});
