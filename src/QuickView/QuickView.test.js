import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { data } from "../../sample-data";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QuickView } from "./QuickView";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("QuickView", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
  });

  test("Renders what we expect", async () => {
    const quickViewComponent = () => <QuickView campsite={data.data[0]} />;
    const { getByText, getAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Quick View">
          <Stack.Screen name="Quick View" component={quickViewComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const siteTitle = await waitFor(() =>
      getByText("Dispersed Camping Near St. Mary's Glacier")
    );
    const location = await waitFor(() => getByText("Idaho Springs, CO"));
    const description = await waitFor(() =>
      getByText(
        "Dispersed campsites are all along Fall River Rd. We saw at least 4 other vehicles camping 20 to 100 feet off the road. There are also a dozen or so ar..."
      )
    );
    const moreDetails = await waitFor(() =>
      getByText("Cick for more details >")
    );
    const activityIcons = await waitFor(() => getAllByTestId("activity-icon"));
    expect(siteTitle).toBeTruthy();
    expect(location).toBeTruthy();
    expect(description).toBeTruthy();
    expect(moreDetails).toBeTruthy();
    expect(activityIcons).toHaveLength(2);
  });
});
