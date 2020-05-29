import React from "react";
import { render, waitFor } from "react-native-testing-library";

import { ListView } from "./ListView";

describe("ListView", () => {
  test("Renders the App name", async () => {
    const { getByTestId } = render(<ListView />);

    const container = await waitFor(() => getByTestId("list container"));
    expect(container).toBeTruthy();
  });
});