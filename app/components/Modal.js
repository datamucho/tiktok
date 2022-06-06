import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import CommentModal from "./CommentModal";

const Modal = ({ idx = -1, setIdx, item }) => {
  return (
    <BottomSheet
      snapPoints={["50%"]}
      index={idx}
      handleHeight={40}
      enablePanDownToClose
      onClose={() => setIdx(-1)}
    >
      <CommentModal item={item} />
    </BottomSheet>
  );
};

export default Modal;

const styles = StyleSheet.create({});
