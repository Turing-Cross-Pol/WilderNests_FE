import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { data } from '../../sample-data'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SiteDetails } from "./SiteDetails";

describe("SiteDetails", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
  })

  test("Renders what we expect", async () => {
    const route = { params: data.data[0]}
    const detailsComponent = () => (
      <SiteDetails route={route} />
    )

    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          <Stack.Screen
            name="Details"
            component={detailsComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const siteTitle = await waitFor(() => getByText("Dispersed Camping Near St. Mary's Glacier"));
    const lat = await waitFor(() => getByText("Lat: 39.799558"));
    const lon = await waitFor(() => getByText("Long: -105.626933"));
    const description = await waitFor(() => getByText("Dispersed campsites are all along Fall River Rd. We saw at least 4 other vehicles camping 20 to 100 feet off the road. There are also a dozen or so areas to pull off on the shoulder as well. Expect mostly level dirt paths or shoulder areas and look for stone fire rings marking the dispersed sites. There are no amenities (no restrooms, water, etc.). We stayed several days and were not bothered. See http://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5165771.pdf for exact site details."));
    
    expect(siteTitle).toBeTruthy();
    expect(lat).toBeTruthy();
    expect(lon).toBeTruthy();
    expect(description).toBeTruthy();
  });
});