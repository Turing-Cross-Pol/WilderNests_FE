import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import App from './App';

describe('<App />', () => {
  test('Renders what we expect', async () => {
    const { getByText } = render(<App />);
    const wildernests = await waitFor(() => getByText('WilderNests'));
    expect(wildernests).toBeTruthy();
  });
});