import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "./assets/constants/constants";
import { Landing } from "./src/Landing/Landing";
import { PostForm } from "./src/PostForm/PostForm";
import { ToggleView } from "./src/ToggleView/ToggleView";
import { SiteDetails } from "./src/SiteDetails/SiteDetails";
import { CommentForm } from "./src/CommentForm/CommentForm";
import { loadData } from './src/apiCalls';

// Disables warnsing from displaying in app.
console.disableYellowBox = true;

const Stack = createStackNavigator();

const App = () => {
  const [campsiteData, setCampsiteData] = useState([]);

  useEffect(() => {
    loadData(setCampsiteData);
  }, []);

  const brandHeader = {
    title: "WilderNests",
    headerStyle: {
      backgroundColor: COLORS.green,
    },
    headerTitleStyle: {
      color: "#fff",
    },
    headerBackTitleStyle: {
      color: "#fff",
    },
    headerTintColor: "#fff",
  };

  const toggleComponent = () => <ToggleView data={campsiteData} />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Home"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Post">
          {props => <PostForm {...props} loadData={() => loadData(setCampsiteData)} />}
        </Stack.Screen>
        <Stack.Screen
          name="Toggle View"
          component={toggleComponent}
          options={brandHeader}
        />
        <Stack.Screen
          name="Details"
          component={SiteDetails}
          options={brandHeader}
        />
        <Stack.Screen
          name="Comment Form"
          component={CommentForm}
          options={brandHeader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
