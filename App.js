import { ActivityIndicator } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

export default function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  let [fontsLoaded] = useFonts({
    "Inter-Black": require("./app/assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {() => <LoginScreen setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ headerShown: false }}>
          {() => <RegisterScreen setUser={setUser} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => <HomeScreen user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
