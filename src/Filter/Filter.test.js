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
    const filterComponent = () => <Filter setSelected={jest.fn()} options={options} />
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Filter"
            component={filterComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const filterButton = await waitFor(() => getByText("Filter (expand)"));

    expect(filterButton).toBeTruthy();
  });
  test("Expands when clicked", async () => {
    const filterComponent = () => <Filter setSelected={jest.fn()} options={options} />
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Filter"
            component={filterComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const filterButton = await waitFor(() => getByText("Filter (expand)"));
    fireEvent.press(filterButton);
    const idahoSprings = await waitFor(() => getByText("Idaho Springs, CO"));
    const expanded = await waitFor(() => getByText("Filter (hide)"));
    expect(idahoSprings).toBeTruthy();
    expect(expanded).toBeTruthy();
  });

  test("Expands with unchecked boxes", async () => {
    const filterComponent = () => <Filter setSelected={jest.fn()} options={options} />
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Filter"
            component={filterComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const filterButton = await waitFor(() => getByText("Filter (expand)"));
    fireEvent.press(filterButton);
    const unchecked = await waitFor(() => getByTestId("unchecked-0"));
    expect(unchecked).toBeTruthy();
  });

  test("Can have boxes checked when expanded", async () => {
    const filterComponent = () => <Filter setSelected={jest.fn()} options={options} />
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Filter"
            component={filterComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const filterButton = await waitFor(() => getByText("Filter (expand)"));
    fireEvent.press(filterButton);
    const unchecked = await waitFor(() => getByTestId("unchecked-0"));
    fireEvent.press(unchecked);
    const checked = await waitFor(() => getByTestId("checked-0"));
    expect(checked).toBeTruthy();
  });
});
