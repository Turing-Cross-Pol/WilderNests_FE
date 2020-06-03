import React from "react";
import { render, waitFor, fireEvent } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { postData } from "../apiCalls";
import { PostForm } from "./PostForm";
import { act } from "react-test-renderer";

jest.mock("../apiCalls");
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("PostForm", () => {
  let Stack;

  beforeEach(() => {
    Stack = createStackNavigator();
  });

  test("Renders Form to screen", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />;
    const { getByText, getByTestId, getByPlaceholder, getAllByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={postFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const header = await waitFor(() =>
      getByText("Tell us about your campsite")
    );
    expect(header).toBeTruthy();
    expect(await waitFor(() => getByText("Title*:"))).toBeTruthy();
    expect(await waitFor(() => getByText("City:"))).toBeTruthy();
    expect(await waitFor(() => getByText("State:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Lat (-90 to 90)*:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Long (-180 to 180)*:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Description:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Directions:"))).toBeTruthy();
    expect(await waitFor(() => getByText("Image:"))).toBeTruthy();

    expect(
      await waitFor(() => getByPlaceholder("Campsite Title"))
    ).toBeTruthy();
    expect(
      await waitFor(() => getByPlaceholder("Closest city/town"))
    ).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("State"))).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("Latitude"))).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("Longitude"))).toBeTruthy();
    expect(
      await waitFor(() =>
        getByPlaceholder(
          "A brief description of the site including details about the surroundings"
        )
      )
    ).toBeTruthy();
    expect(
      await waitFor(() =>
        getByPlaceholder(
          "How far is it from major roads? Any tips for landmarks to look out for?"
        )
      )
    ).toBeTruthy();
    expect(await waitFor(() => getByPlaceholder("Image URL"))).toBeTruthy();

    expect(
      await waitFor(() => getByText("Available Amenities Nearby:"))
    ).toBeTruthy();
    expect(await waitFor(() => getByTestId("Firepit"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Boating/Water"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Fishing"))).toBeTruthy();
    expect(
      await waitFor(() => getByTestId("Mountain Biking Trails"))
    ).toBeTruthy();
    expect(await waitFor(() => getByTestId("ATV Trails"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Horse Trails"))).toBeTruthy();
    expect(await waitFor(() => getByTestId("Hiking Trails"))).toBeTruthy();
    expect(await waitFor(() => getByText("Submit Campsite"))).toBeTruthy();

    expect(await waitFor(() => getAllByTestId("check-icon"))).toHaveLength(7);
  });

  test("User can change input fields", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />;
    const { getByText, getByTestId, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={postFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const titleInput = await waitFor(() => getByPlaceholder("Campsite Title"));
    const cityInput = await waitFor(() =>
      getByPlaceholder("Closest city/town")
    );
    const stateInput = await waitFor(() => getByPlaceholder("State"));
    const latInput = await waitFor(() => getByPlaceholder("Latitude"));
    const longInput = await waitFor(() => getByPlaceholder("Longitude"));
    const descInput = await waitFor(() =>
      getByPlaceholder(
        "A brief description of the site including details about the surroundings"
      )
    );
    const driveInput = await waitFor(() =>
      getByPlaceholder(
        "How far is it from major roads? Any tips for landmarks to look out for?"
      )
    );
    const imgInput = await waitFor(() => getByPlaceholder("Image URL"));

    act(() => {
      fireEvent.changeText(titleInput, "sample title");
      fireEvent.changeText(cityInput, "sample city");
      fireEvent.changeText(stateInput, "sample state");
      fireEvent.changeText(latInput, 50);
      fireEvent.changeText(longInput, 60);
      fireEvent.changeText(descInput, "sample desc");
      fireEvent.changeText(driveInput, "sample drive");
      fireEvent.changeText(imgInput, "sample img");
    });

    expect(await waitFor(() => titleInput.props.value)).toEqual("sample title");
    expect(await waitFor(() => cityInput.props.value)).toEqual("sample city");
    expect(await waitFor(() => stateInput.props.value)).toEqual("sample state");
    expect(await waitFor(() => latInput.props.value)).toEqual(50);
    expect(await waitFor(() => longInput.props.value)).toEqual(60);
    expect(await waitFor(() => descInput.props.value)).toEqual("sample desc");
    expect(await waitFor(() => driveInput.props.value)).toEqual("sample drive");
    expect(await waitFor(() => imgInput.props.value)).toEqual("sample img");
  });

  test("User can't submit the form if the lat, long, and title aren't present", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />;
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={postFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const submitButton = await waitFor(() => getByText("Submit Campsite"));
    act(() => {
      fireEvent.press(submitButton);
    });
    const errorMessage = await waitFor(() =>
      getByText("All fields marked with an * are required and must be valid.")
    );
    expect(await waitFor(() => errorMessage)).toBeTruthy;
    expect(await waitFor(() => postData)).not.toBeCalled();
  });

  test("User can't submit the form if the lat or long are invalid", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />;
    const { getByText, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={postFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const lat = await waitFor(() => getByPlaceholder("Latitude"));
    const long = await waitFor(() => getByPlaceholder("Longitude"));
    const title = await waitFor(() => getByPlaceholder("Campsite Title"));
    act(() => {
      fireEvent.changeText(title, "Cool Campsite");
      fireEvent.changeText(lat, "80");
      fireEvent.changeText(long, "190");
    });
    const submitButton = await waitFor(() => getByText("Submit Campsite"));
    act(() => {
      fireEvent.press(submitButton);
    });
    const errorMessage = await waitFor(() =>
      getByText("All fields marked with an * are required and must be valid.")
    );
    expect(await waitFor(() => errorMessage)).toBeTruthy;
    expect(await waitFor(() => postData)).not.toBeCalled();
  });

  test("User can submit the form if at least title, lat, and long are valid", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />;
    const { getByText, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={postFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const lat = await waitFor(() => getByPlaceholder("Latitude"));
    const long = await waitFor(() => getByPlaceholder("Longitude"));
    const title = await waitFor(() => getByPlaceholder("Campsite Title"));
    act(() => {
      fireEvent.changeText(title, "Cool Campsite");
      fireEvent.changeText(lat, "80");
      fireEvent.changeText(long, "100");
    });
    const submitButton = await waitFor(() => getByText("Submit Campsite"));
    act(() => {
      fireEvent.press(submitButton);
    });
    const successMessage = await waitFor(() =>
      getByText("Form successfully submitted")
    );
    expect(await waitFor(() => successMessage)).toBeTruthy;
    expect(await waitFor(() => postData)).toBeCalled();
  });

  test("Inputs should clear after form is successfully submitted", async () => {
    const postFormComponent = () => <PostForm loadData={jest.fn()} />;
    const { getByText, getByPlaceholder } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={postFormComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const lat = await waitFor(() => getByPlaceholder("Latitude"));
    const long = await waitFor(() => getByPlaceholder("Longitude"));
    const title = await waitFor(() => getByPlaceholder("Campsite Title"));
    act(() => {
      fireEvent.changeText(title, "Cool Campsite");
      fireEvent.changeText(lat, "80");
      fireEvent.changeText(long, "100");
    });
    const submitButton = await waitFor(() => getByText("Submit Campsite"));
    act(() => {
      fireEvent.press(submitButton);
    });
    expect(await waitFor(() => title.props.value)).toEqual("");
    expect(await waitFor(() => lat.props.value)).toEqual("");
    expect(await waitFor(() => long.props.value)).toEqual("");
  });
});
