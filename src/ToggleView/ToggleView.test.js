import React from "react";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { data } from "../../sample-data";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ToggleView } from "./ToggleView";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
import { act } from "react-test-renderer";

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

describe("ToggleView", () => {
  let Stack;
  let onPressMock;

  beforeEach(() => {
    Stack = createStackNavigator();
    onPressMock = jest.fn();
  });

  test("Renders what we expect", async () => {
    const toggleComponent = () => <ToggleView data={data.data} />;

    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Toggle View">
          <Stack.Screen name="Toggle View" component={toggleComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const list = await waitFor(() => getByText("List View"));
    const map = await waitFor(() => getByText("Map View"));
    expect(list).toBeTruthy();
    expect(map).toBeTruthy();
  });

  test("Starts on the Map View page", async () => {
    const toggleComponent = () => <ToggleView data={data.data} />;

    const { findAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Toggle View">
          <Stack.Screen name="Toggle View" component={toggleComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const markers = await waitFor(() => findAllByTestId("marker"));
    expect(markers).toHaveLength(4);
  });

  test("Can navigate to the on the Map View page", async () => {
    const toggleComponent = () => <ToggleView data={data.data} />;

    const { getByText, findAllByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Toggle View">
          <Stack.Screen name="Toggle View" component={toggleComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const listViewBtn = await waitFor(() => getByText("List View"));
    act(() => {
      fireEvent.press(listViewBtn);
    })
    const siteTitle1 = await waitFor(() =>
      getByText("Dispersed Camping Near St. Mary's Glacier")
    );
    const siteTitle2 = await waitFor(() => getByText("Yankee Hill"));
    const siteTitle3 = await waitFor(() =>
      getByText("Camping on Mill Creek Rd")
    );
    const siteTitle4 = await waitFor(() =>
      getByText("Bald Mountain Ln West of Central City, CO")
    );
    const siteLocation = await waitFor(() =>
      findAllByText("Idaho Springs, CO")
    );

    expect(siteTitle1).toBeTruthy();
    expect(siteLocation).toHaveLength(3);
    expect(siteTitle2).toBeTruthy();
    expect(siteTitle3).toBeTruthy();
    expect(siteTitle4).toBeTruthy();
  });
});
