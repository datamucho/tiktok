import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Video } from "expo-av";
import VideoDescription from "./VideoDescription";
import Interactions from "./Interactions";
import Modal from "./Modal";
import { useMutation, useQuery } from "react-query";
import { useFetch, usePost } from "./api/useFetch";

const Post = forwardRef((props, parentRef) => {
  const { mutate: handleLike } = useMutation(
    (id) => usePost("POST", `like_video/${id}`, (data = { id })),
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
    (id) => usePost("POST", `unlike_video/${id}`, (data = { id })),
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (res) => {
        console.log("succes", res);
      },
    }
  );

  const ref = useRef(null);
  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));
  const [idx, setIdx] = useState(-1);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    return () => unload();
  }, []);

  const onLike = (id) => {
    if (isLike) {
      handleUnlike(id);
    } else {
      handleLike(id);
    }
    setIsLike((prevState) => !prevState);
  };

  const play = async () => {
    try {
      if (ref.current == null) return;
      const status = await ref.current.getStatusAsync();
      if (status?.isPlaying) return;
      await ref.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  };
  const stop = async () => {
    try {
      if (ref.current == null) return;

      const status = await ref.current.getStatusAsync();
      if (!status?.isPlaying) return;

      await ref.current.stopAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const unload = async () => {
    try {
      if (ref.current == null) return;

      await ref.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={ref}
        style={styles.video}
        resizeMode="cover"
        isLooping={true}
        source={{ uri: props.item.video_url }}
        shouldPlay={false}
      />
      <View style={styles.footer}>
        <VideoDescription />
        <Interactions
          item={props.item}
          onCommentPress={() =>
            setIdx((prevState) => (prevState == 0 ? -1 : 0))
          }
          onLike={onLike}
          isLike={isLike}
        />
      </View>
      <Modal idx={idx} setIdx={setIdx} item={props.item} />
    </View>
  );
});

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  video: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
});
