import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
import { data } from '../../sample-data';
import { ListCard } from './ListCard';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

jest.mock('react-native/Libraries/Animated/')
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('ListCard Test', () => {
  let sampleData;

  beforeEach(() => {
    sampleData = data.data[0];
  });

  test('Renders what we expect', async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <ListCard info={sampleData} />
      </NavigationContainer>
    );
    await waitFor(() => getByText('Dispersed Camping Near St. Mary\'s Glacier'));
    expect(getByText('Dispersed Camping Near St. Mary\'s Glacier')).toBeTruthy();
    expect(getByText('Dispersed campsites are all along Fall River Rd. We saw at least 4 other vehicles camping 20 to 100 feet off the road. There are also a dozen or so areas to pull off on the shoulder as well. Expect mostly level dirt paths or shoulder areas and look for stone fire rings marking the dispersed sites. There are no amenities (no restrooms, water, etc.). We stayed several days and were not bothered. See http://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5165771.pdf for exact site details.')).toBeTruthy();
    expect(getByText('Idaho Springs, Colorado')).toBeTruthy();
    expect(getByTestId('data-img')).toBeTruthy();
  });
});