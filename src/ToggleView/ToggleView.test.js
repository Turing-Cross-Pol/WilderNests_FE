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

  test("Starts on the List View page", async () => {
    const toggleComponent = () => <ToggleView data={data.data} />;

    const { getByText, findAllByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Toggle View">
          <Stack.Screen name="Toggle View" component={toggleComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
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
