import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Landing } from "./src/Landing/Landing";
import { PostForm } from "./src/PostForm/PostForm";
import { ListView } from "./src/ListView/ListView";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Home"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Post" component={PostForm} />
        <Stack.Screen name="List View" component={ListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
