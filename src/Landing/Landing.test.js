import React from "react";
import { render, waitFor } from "react-native-testing-library";

import { Landing } from "./Landing";

describe("Landing Component", () => {
  test("Renders the App name", async () => {
    const { getByText } = render(<Landing />);

    await waitFor(() => getByText("WilderNests"));
    expect(getByText("WilderNests")).toBeTruthy();
  });

  test("Renders the Find and Post buttons", async () => {
    const { getByText } = render(<Landing />);

    const find = await waitFor(() => getByText("Find a Campsite"));
    const post = await waitFor(() => getByText("Post a Campsite"));
    expect(find).toBeTruthy();
    expect(post).toBeTruthy();
  });
});
