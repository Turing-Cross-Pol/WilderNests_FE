import React from "react";
import { render, waitFor } from "react-native-testing-library";

import { ToggleView } from "./ToggleView";

describe("ToggleView", () => {
  test("Renders the App name", async () => {
    const { getByText } = render(<ToggleView />);

    const list = await waitFor(() => getByText("List View"));
    const map = await waitFor(() => getByText("Map View"));
    expect(list).toBeTruthy();
    expect(map).toBeTruthy();
  });
});
