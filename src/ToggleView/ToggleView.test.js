import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { data } from "../../sample-data";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ToggleView } from "./ToggleView";

describe("ToggleView", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
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
});
