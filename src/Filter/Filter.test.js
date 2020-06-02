import React from "react";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { data } from "../../sample-data";
import { Filter } from "./Filter";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("Filter Test", () => {
  let Stack;
  let options;

  beforeEach(() => {
    Stack = createStackNavigator();
    options = data.data.filter((data) => data.city && data.state);
    options = options.map((data) => data.city + ", " + data.state);
    options = [...new Set(options)];
    options = options.sort();
  });

  test("Renders what we expect", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Filter"
            component={() => <Filter setSelected={jest.fn()} options={options}/>}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const filterButton = await waitFor(() =>
      getByText("Filter (expand)")
    );

    expect(filterButton).toBeTruthy();
  });
  test("Expands when clicked", async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Filter"
            component={() => <Filter setSelected={jest.fn()} options={options}/>}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const filterButton = await waitFor(() =>
      getByText("Filter (expand)")
    );
    fireEvent.press(filterButton);
    const idahoSprings = await waitFor(() =>
      getByText("Idaho Springs, CO")
    );
    const expanded = await waitFor(() =>
      getByText("Filter (hide)")
    );
    expect(expanded).toBeTruthy();
  });
});
