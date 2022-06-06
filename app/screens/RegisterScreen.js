import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import { Form, Formik } from "formik";
import FormField from "../components/FormField";
import { Link } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

const RegisterScreen = ({ setUser, user }) => {
  const handleSignUp = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user: ", user);
        setUser(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <Screen>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.textContainer}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.welcomeText}>
            Welcome back, register with your credentials to access your acount.
          </Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleSignUp(values)}
        >
          {({ handleSubmit }) => (
            <>
              <View style={styles.inputContainer}>
                <FormField name="email" placeholder="Email" />
                <FormField
                  name="password"
                  placeholder="Password"
                  secure={true}
                />
                <FormField
                  name="repeat password"
                  placeholder="Repeat Password"
                  secure={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Register{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Have an account?</Text>
          <Text style={{ color: "#FFAB07", marginHorizontal: 5 }}>
            <Link to="/Login">Sign In</Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  welcomeText: {
    opacity: 0.7,
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  inputContainer: {
    marginTop: 50,
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    width: "100%",
    padding: 5,
    height: 50,
    alignSelf: "center",
  },
  formField: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
  },
  buttonContainer: {
    marginVertical: 40,
  },
  button: {
    width: "80%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 45,
    borderRadius: 20,
  },
});
