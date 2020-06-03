import React from "react";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { loadData } from "./src/apiCalls";
import { createStackNavigator } from "@react-navigation/stack";
import App from "./App";
jest.mock("./src/apiCalls");
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock('react-native-maps', () => {
  const { View, TouchableOpacity } = require('react-native');
  const onPressMock = jest.fn();
  const MockMapView = (props) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props) => {
    return <TouchableOpacity testID='marker' onPress={onPressMock}>{props.children}</TouchableOpacity>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

describe("<App />", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
  });

  test("Renders landing page to start", async () => {
    const { getByText } = render(<App />);
    const wildernests = await waitFor(() => getByText("WilderNests"));
    const find = await waitFor(() => getByText("Find a Campsite"));
    const post = await waitFor(() => getByText("Post a Campsite"));
    expect(wildernests).toBeTruthy();
    expect(find).toBeTruthy();
    expect(post).toBeTruthy();
  });

  test("Can navigate to the map view", async () => {
    const { getByText, getByTestId } = render(<App />);
    const find = await waitFor(() => getByText("Find a Campsite"));
    expect(loadData).toBeCalled();
    expect(find).toBeTruthy();
    fireEvent.press(find);
    const mapContainer = await waitFor(() => getByTestId("map-container"));
    expect(mapContainer).toBeTruthy();
  });

  test("Can navigate to post form", async () => {
    const { getByText, getByPlaceholder, getByTestId, getAllByTestId } = render(<App />);
    const post = await waitFor(() => getByText("Post a Campsite"));
    expect(post).toBeTruthy();
    fireEvent.press(post);
    const header = await waitFor(() =>
      getByText("Tell us about your campsite")
    );
    expect(header).toBeTruthy();
    expect(getByText("Title*:")).toBeTruthy();
    expect(getByText("City:")).toBeTruthy();
    expect(getByText("State:")).toBeTruthy();
    expect(getByText("Lat (-90 to 90)*:")).toBeTruthy();
    expect(getByText("Long (-180 to 180)*:")).toBeTruthy();
    expect(getByText("Description:")).toBeTruthy();
    expect(getByText("Directions:")).toBeTruthy();
    expect(getByText("Image:")).toBeTruthy();

    expect(getByPlaceholder("Campsite Title")).toBeTruthy();
    expect(getByPlaceholder("Closest city/town")).toBeTruthy();
    expect(getByPlaceholder("State")).toBeTruthy();
    expect(getByPlaceholder("Latitude")).toBeTruthy();
    expect(getByPlaceholder("Longitude")).toBeTruthy();
    expect(
      getByPlaceholder(
        "A brief description of the site including details about the surroundings"
      )
    ).toBeTruthy();
    expect(
      getByPlaceholder(
        "How far is it from major roads? Any tips for landmarks to look out for?"
      )
    ).toBeTruthy();
    expect(getByPlaceholder("Image URL")).toBeTruthy();

    expect(getByText("Available Amenities Nearby:")).toBeTruthy();
    expect(getByTestId("Firepit")).toBeTruthy();
    expect(getByTestId("Boating/Water")).toBeTruthy();
    expect(getByTestId("Fishing")).toBeTruthy();
    expect(getByTestId("Mountain Biking Trails")).toBeTruthy();
    expect(getByTestId("ATV Trails")).toBeTruthy();
    expect(getByTestId("Horse Trails")).toBeTruthy();
    expect(getByTestId("Hiking Trails")).toBeTruthy();
    expect(getByText("Submit Campsite")).toBeTruthy();

    expect(getAllByTestId("check-icon")).toHaveLength(7);
  });
});
