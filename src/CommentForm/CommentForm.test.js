import React from "react";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { data } from "../../sample-data";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { postComment } from "../apiCalls"
import { CommentForm } from "./CommentForm";
jest.mock("../apiCalls");

describe("CommentForm", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
  });

  test("Renders what we expect", async () => {
    const route = { params: data.data[0] };
    const commentFormComponent = () => <CommentForm route={route} />;

    const { getByText, getByPlaceholder, getAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Comment">
          <Stack.Screen name="Comment" component={commentFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const commentDescription = await waitFor(() =>
      getByText("Comment for Dispersed Camping Near St. Mary's Glacier")
    );
    const stars = await waitFor(() => getAllByTestId("star-icon"));
    const titleInput = await waitFor(() => getByPlaceholder("Comment Title"));
    const commentInput = await waitFor(() =>
      getByPlaceholder(
        "Please provide any comments about this site that may be helpful to other visitors"
      )
    );
    const submitBtn = await waitFor(() => getByText("Submit Comment"));
    expect(commentDescription).toBeTruthy();
    expect(stars).toHaveLength(5);
    expect(titleInput).toBeTruthy();
    expect(commentInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  test("Should have a disbled button if all fields are blank", async () => {
    const route = { params: data.data[0] };
    const commentFormComponent = () => <CommentForm route={route} />;
    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Comment">
          <Stack.Screen name="Comment" component={commentFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const submitBtn = await waitFor(() => getByTestId("submit-opacity"));
    fireEvent.press(submitBtn);
    expect(postComment).not.toBeCalled();
  });

  test("Should be able to submit the form if any fields aren't blank", async () => {
    const route = { params: data.data[0] };
    const commentFormComponent = () => <CommentForm route={route} />;

    const { getByTestId, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Comment">
          <Stack.Screen name="Comment" component={commentFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const submitBtn = await waitFor(() => getByTestId("submit-opacity"));
    const titleInput = await waitFor(() => getByPlaceholder("Comment Title"));
    fireEvent.changeText(titleInput, 'Great Campsite');
    fireEvent.press(submitBtn);
    expect(postComment).toBeCalled();
  });
});
