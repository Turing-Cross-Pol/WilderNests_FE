import React from 'react';
import { render, waitFor } from "react-native-testing-library";
import { data } from '../../sample-data';
import { ListCard } from './ListCard';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('ListCard Test', () => {
  let sampleData;
  let Stack;

  beforeEach(() => {
    sampleData = data.data[0];
    Stack = createStackNavigator();
  });

  test('Renders what we expect', async () => {
    const listCardComponent = () => <ListCard info={sampleData} />
    const { getByText, getByTestId, getAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="List Card"
            component={listCardComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const campsiteName = await waitFor(() => getByText("Dispersed Camping Near St. Mary's Glacier"));

    expect(campsiteName).toBeTruthy();
    expect(await waitFor(() => getByTestId('data-img'))).toBeTruthy();
    expect(await waitFor(() => getByText('Idaho Springs, CO'))).toBeTruthy();
    expect(await waitFor(() => getAllByTestId('activity-icon'))).toHaveLength(2)
  });
});