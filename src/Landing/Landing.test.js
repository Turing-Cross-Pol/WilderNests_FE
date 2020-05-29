import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import { Landing } from './Landing';


describe('Landing Component', () => {
  test('Renders to the screen', async () => {
    const { getByText } = render(<Landing />);
    
    await waitFor(() => getByText('WilderNests'));
    expect(getByText('WilderNests')).toBeTruthy();
  });
});