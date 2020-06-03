import React from "react";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { loadData } from "./src/apiCalls";
import { createStackNavigator } from "@react-navigation/stack";
import App from "./App";
import { act } from "react-test-renderer";
jest.mock("./src/apiCalls");
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native-maps", () => {
  const { View, TouchableOpacity } = require("react-native");
  const onPressMock = jest.fn();
  const MockMapView = (props) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props) => {
    return (
      <TouchableOpacity testID="marker" onPress={onPressMock}>
        {props.children}
      </TouchableOpacity>
    );
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
    expect(await waitFor(() => loadData)).toBeCalled();
    expect(find).toBeTruthy();
    act(() => {
      fireEvent.press(find);
    });
    const mapContainer = await waitFor(() => getByTestId("map-container"));
    expect(mapContainer).toBeTruthy();
  });

  test("Can navigate to post form", async () => {
    const { getByText, getByPlaceholder, getByTestId, getAllByTestId } = render(
      <App />
    );
    const post = await waitFor(() => getByText("Post a Campsite"));
    expect(post).toBeTruthy();
    act(() => {
      fireEvent.press(post);
    });
    const header = await waitFor(() =>
      getByText("Tell us about your campsite")
    );
    expect(header).toBeTruthy();
    expect(await waitFor(() => getByText("Title*:"))).toBeTruthy();
    expect(await waitFor(() => getByText("City:"))).toBeTruthy();
    expect(await waitFor(() => getByText("State:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Lat (-90 to 90)*:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Long (-180 to 180)*:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Description:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Directions:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Image:"))).toBeTruthy();

    expect(
      await waitFor(() => getByPlaceholder("Campsite Title"))
    ).toBeTruthy();
    expect(
      await waitFor(() => getByPlaceholder("Closest city/town"))
    ).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("State"))).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("Latitude"))).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("Longitude"))).toBeTruthy();
    expect(
      await waitFor(() =>
        getByPlaceholder(
          "A brief description of the site including details about the surroundings"
        )
      )
    ).toBeTruthy();
    expect(
      await waitFor(() =>
        getByPlaceholder(
          "How far is it from major roads? Any tips for landmarks to look out for?"
        )
      )
    ).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("Image URL"))).toBeTruthy();

    expect(
      await waitFor(() => getByText("Available Amenities Nearby:"))
    ).toBeTruthy();
    expect(await waitFor(() => getByTestId("Firepit"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Boating/Water"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Fishing"))).toBeTruthy();
    expect(
      await waitFor(() => getByTestId("Mountain Biking Trails"))
    ).toBeTruthy();
    expect(await waitFor(() => getByTestId("ATV Trails"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Horse Trails"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Hiking Trails"))).toBeTruthy();
    expect(await waitFor(() => getByText("Submit Campsite"))).toBeTruthy();

    expect(await waitFor(() => getAllByTestId("check-icon"))).toHaveLength(7);
  });
});
