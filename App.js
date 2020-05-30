import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from './assets/constants/constants';
import { Landing } from "./src/Landing/Landing";
import { PostForm } from "./src/PostForm/PostForm";
import { ToggleView } from "./src/ToggleView/ToggleView";
import { SiteDetails } from "./src/SiteDetails/SiteDetails";


const Stack = createStackNavigator();

const App = () => {
  const [campsiteData, setCampsiteDate] = useState([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await fetch('https://dpcamping-be-stage.herokuapp.com/campsites/');
    const data = await response.json();
    setCampsiteDate(data);
  }

  const brandHeader = {
    title: 'WilderNests',
    headerStyle: {
      backgroundColor: COLORS.green,
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerBackTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff',
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Home"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Post" component={PostForm} />
        <Stack.Screen 
          name="Toggle View" 
          component={() => <ToggleView data={campsiteData} />} 
          options={brandHeader}
        />
        <Stack.Screen 
          name="Details" 
          component={SiteDetails} 
          options={brandHeader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
