import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CommentCard } from "./CommentCard";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("CommentCard", () => {
  let Stack;
  let info;

  beforeEach(() => {
    Stack = createStackNavigator();
    info = {
      id: 1,
      campsite_id: 1,
      description: 'One of my favorite campsites in Colorado.',
      title: 'Best camping in Colorado!',
      rating: 5,
    }
  });

  test("Renders what we expect", async () => {
    const commentCardComponent = () => <CommentCard info={info} key={1} />;

    const { getByText, getByPlaceholder, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Comment">
          <Stack.Screen name="Comment" component={commentCardComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const commentDescription = await waitFor(() =>
      getByText("One of my favorite campsites in Colorado.")
    );
    const star0 = await waitFor(() => getByTestId("comment-star-0"));
    const star1 = await waitFor(() => getByTestId("comment-star-1"));
    const star2 = await waitFor(() => getByTestId("comment-star-2"));
    const star3 = await waitFor(() => getByTestId("comment-star-3"));
    const star4 = await waitFor(() => getByTestId("comment-star-4"));
    const titleInput = await waitFor(() => getByText("Best camping in Colorado!"));

    expect(commentDescription).toBeTruthy();
    expect(star0).toBeTruthy();
    expect(star1).toBeTruthy();
    expect(star2).toBeTruthy();
    expect(star3).toBeTruthy();
    expect(star4).toBeTruthy();
    expect(titleInput).toBeTruthy();
  });

});
