import React from 'react';
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import { PostForm } from "./PostForm";

describe("PostForm", () => {
  let Stack;
  let onPressMock;

  beforeEach(() => {
    Stack = createStackNavigator();
  });

  test("Renders Form to screen", async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Post"
            component={PostForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const header = await waitFor(() => getByText('Tell us about your campsite'));
    expect(header).toBeTruthy();
    expect(getByText('Title:')).toBeTruthy();
    expect(getByText('City:')).toBeTruthy();
    expect(getByText('State:')).toBeTruthy();
    expect(getByText('Lat:')).toBeTruthy();
    expect(getByText('Long:')).toBeTruthy();
    expect(getByText('Description:')).toBeTruthy();
    expect(getByText('Directions:')).toBeTruthy();
    expect(getByText('Image:')).toBeTruthy();
    
    expect(getByText('Available Amenities Nearby:')).toBeTruthy();
    expect(getByTestId('Firepit')).toBeTruthy();
    expect(getByTestId('Boating/Water')).toBeTruthy();
    expect(getByTestId('Fishing')).toBeTruthy();
    expect(getByTestId('Mountain Biking Trails')).toBeTruthy();
    expect(getByTestId('ATV Trails')).toBeTruthy();
    expect(getByTestId('Horse Trails')).toBeTruthy();
    expect(getByTestId('Hiking Trails')).toBeTruthy();
    
    expect(getByText('Submit Campsite')).toBeTruthy();
  });

  test("User can fill out and submit form", async () => {
    const { getByText, getByTestId, getByPlaceholder, debug } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Post"
            component={PostForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const header = await waitFor(() => getByText('Tell us about your campsite'));
    expect(header).toBeTruthy();

    const title = getByPlaceholder('Campsite Title');
    const city = getByPlaceholder('Closest city/town');
    const state = getByPlaceholder('State');
    const lat = getByPlaceholder('Latitude');
    const long = getByPlaceholder('Longitude');
    const descrition = getByPlaceholder('A brief description of the site including details about the surroundings');
    const directions = getByPlaceholder('How far is it from major roads? Any tips for landmarks to look out for?');
    const image = getByPlaceholder('Image URL');
    const submitButton = getByText('Submit Campsite');

    fireEvent.changeText(title, { nativeEvent: { text: 'My Favorite Spot'}})
    // debug();
    
    // Add tests for mocking out button click response value.
  });
});