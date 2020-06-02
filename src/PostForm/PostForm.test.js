import React from 'react';
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { postData } from "../apiCalls";
jest.mock("../apiCalls");
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import { PostForm } from "./PostForm";

describe("PostForm", () => {
  let Stack;
  let onPressMock;

  beforeEach(() => {
    Stack = createStackNavigator();
  });

  test("Renders Form to screen", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />
    const { getByText, getByTestId, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Post"
            component={postFormComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const header = await waitFor(() => getByText('Tell us about your campsite'));
    expect(header).toBeTruthy();
    expect(getByText('Title*:')).toBeTruthy();
    expect(getByText('City:')).toBeTruthy();
    expect(getByText('State:')).toBeTruthy();
    expect(getByText('Lat (-90 to 90)*:')).toBeTruthy();
    expect(getByText('Long (-180 to 180)*:')).toBeTruthy();
    expect(getByText('Description:')).toBeTruthy();
    expect(getByText('Directions:')).toBeTruthy();
    expect(getByText('Image:')).toBeTruthy();

    expect(getByPlaceholder('Campsite Title')).toBeTruthy();
    expect(getByPlaceholder('Closest city/town')).toBeTruthy();
    expect(getByPlaceholder('State')).toBeTruthy();
    expect(getByPlaceholder('Latitude')).toBeTruthy();
    expect(getByPlaceholder('Longitude')).toBeTruthy();
    expect(getByPlaceholder('A brief description of the site including details about the surroundings')).toBeTruthy();
    expect(getByPlaceholder('How far is it from major roads? Any tips for landmarks to look out for?')).toBeTruthy();
    expect(getByPlaceholder('Image URL')).toBeTruthy();

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

  test("User can't submit the form if the lat, long, and title aren't present", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />
    const { getByText, getByTestId, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Post"
            component={postFormComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const submitButton = getByText('Submit Campsite');
    fireEvent.press(submitButton);
    const errorMessage = await waitFor(()=> getByText("All fields marked with an * are required and must be valid."))
    expect(errorMessage).toBeTruthy;
    expect(postData).not.toBeCalled();
  });

  test("User can't submit the form if the lat or long are invalid", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />
    const { getByText, getByTestId, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Post"
            component={postFormComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const lat = getByPlaceholder('Latitude');
    const long = getByPlaceholder('Longitude');
    const title = getByPlaceholder('Campsite Title');
    fireEvent.changeText(title, "Cool Campsite")
    fireEvent.changeText(lat, "80");
    fireEvent.changeText(long, "190");
    const submitButton = getByText('Submit Campsite');
    fireEvent.press(submitButton);
    const errorMessage = await waitFor(()=> getByText("All fields marked with an * are required and must be valid."))
    expect(errorMessage).toBeTruthy;
    expect(postData).not.toBeCalled();
  });

  test("User can submit the form if at least title, lat, and long are valid", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />
    const { getByText, getByTestId, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Post"
            component={postFormComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
    
    const lat = getByPlaceholder('Latitude');
    const long = getByPlaceholder('Longitude');
    const title = getByPlaceholder('Campsite Title');
    fireEvent.changeText(title, "Cool Campsite")
    fireEvent.changeText(lat, "80");
    fireEvent.changeText(long, "100");
    const submitButton = getByText('Submit Campsite');
    fireEvent.press(submitButton);
    const successMessage = await waitFor(()=> getByText("Form successfully submitted"))
    expect(successMessage).toBeTruthy;
    expect(postData).toBeCalled();
  });
});