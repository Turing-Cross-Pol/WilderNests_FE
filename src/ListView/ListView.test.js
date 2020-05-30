import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { data } from '../../sample-data'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ListView } from "./ListView";

describe("ListView", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
  })

  test("Renders the App name", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List View">
          <Stack.Screen
            name="List View"
            component={() => <ListView data={data.data} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const site1 = await waitFor(() => getByText("Dispersed Camping Near St. Mary's Glacier"));
    expect(site1).toBeTruthy();
    expect(true).toEqual(true)
  });
});