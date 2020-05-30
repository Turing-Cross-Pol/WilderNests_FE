import React from 'react';
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { data } from '../../sample-data';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import { MapList } from "./MapList";

jest.mock('react-native-maps', () => {
  const { View, TouchableOpacity } = require('react-native');
  const onPressMock = jest.fn();
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <TouchableOpacity testID='marker' onPress={onPressMock}>{props.children}</TouchableOpacity>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

describe('MapList Test', () => {
  let sampleData;
  let Stack;
  let onPressMock;

  beforeEach(() => {
    sampleData = data.data;
    Stack = createStackNavigator();
    onPressMock = jest.fn();
  });

  test('Renders to screen with 4 markers', async () => {
    const { findAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Map List"
            component={() => <MapList data={sampleData} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const markers = await waitFor(() => findAllByTestId('marker'));
    expect(markers).toHaveLength(4);
  });

  test('Can click on a marker to open QuickView', async () => {
    // const { getByText, findAllByTestId } = render(
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen 
    //         name="Map List"
    //         component={() => <MapList data={sampleData} />}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // );

    // const markers = await waitFor(() => findAllByTestId('marker'));
    // expect(markers).toHaveLength(4);

    // fireEvent.press(markers[0]);
    // expect(onPressMock).toHaveBeenCalled();
  })
  // Click on Marker
  // Check that QuickView has displayed
});