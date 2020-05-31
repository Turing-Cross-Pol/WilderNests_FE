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

  test("Renders a list of ", async () => {
    const { getByText, findAllByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List View">
          <Stack.Screen
            name="List View"
            component={() => <ListView data={data.data} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const siteTitle1 = await waitFor(() => getByText("Dispersed Camping Near St. Mary's Glacier"));
    const siteTitle2 = await waitFor(() => getByText("Yankee Hill"));
    const siteTitle3 = await waitFor(() => getByText("Camping on Mill Creek Rd"));
    const siteTitle4 = await waitFor(() => getByText("Bald Mountain Ln West of Central City, CO"));
    const siteLocation = await waitFor(() => findAllByText("Idaho Springs, Colorado"));
    
    expect(siteTitle1).toBeTruthy();
    expect(siteLocation).toHaveLength(3);
    expect(siteTitle2).toBeTruthy();
    expect(siteTitle3).toBeTruthy();
    expect(siteTitle4).toBeTruthy();
  });
});