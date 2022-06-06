import React from "react";

import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider, QueryClient } from "react-query";
import { signOut } from "firebase/auth";
import { auth } from "../../config";
import { useNavigation } from "@react-navigation/native";

const queryClient = new QueryClient();

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Feed />
          <Navbar signOut={handleSignOut} />
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
