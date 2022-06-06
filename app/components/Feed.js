import { FlatList, StyleSheet, View, StatusBar, Text } from "react-native";
import React, { useRef } from "react";
import Post from "./Post";
import { useQuery } from "react-query";
import { useFetch } from "./api/useFetch";

const Feed = () => {
  const mediaRefs = useRef([]);
  const { data, status } = useQuery("feed", () => useFetch("GET", "feed"));
  // if (status === "error") {
  //   return <Text>Error</Text>;
  // }

  const onViewableItemsChange = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item }) => {
    return (
      <Post
        item={item}
        ref={(PostRef) => (mediaRefs.current[item.id] = PostRef)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={3}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={renderItem}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChange.current}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "black",
  },
});
