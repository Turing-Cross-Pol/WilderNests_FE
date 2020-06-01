import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../assets/constants/constants";
import { postComment } from "../apiCalls";

export const CommentForm = ({ route }) => {
  const { newRating, name, id } = route.params;
  const [rating, setRating] = useState(newRating);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const createStarDisplay = (rating) => {
    const numStars = rating ? Math.ceil(rating) : 0;
    const filledStars = Array(numStars).fill(
      require("../../assets/images/filled-star.png")
    );
    const emptyStars = Array(5 - numStars).fill(
      require("../../assets/images/empty-star.png")
    );
    return filledStars.concat(emptyStars);
  };

  const initialStars = createStarDisplay(rating);
  const [stars, setStars] = useState(initialStars);

  const handleRating = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    const newStars = createStarDisplay(newRating);
    setStars(newStars);
  };

  const handleSubmit = () => {
    postComment(id, description, title, rating);
    setRating("");
    setDescription("");
    setTitle("");
    setMessage("Comment posted!");
  };

  const disabled = !title && !description && !rating;

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatList}
        numColumns={5}
        data={stars}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleRating(index)}>
            <Image
              testID={`star-${index}`}
              source={item}
              key={index}
              style={styles.star}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.header}>Comment for {name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Comment Title"
        value={title}
        onChangeText={(newTitle) => setTitle(newTitle)}
      />
      <TextInput
        style={styles.input}
        placeholder="Please provide any comments about this site that may be helpful to other visitors"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(newComment) => setDescription(newComment)}
      />
      {!!message && <Text style={styles.message}>{message}</Text>}
      <TouchableOpacity
        testID="submit-opacity"
        disabled={disabled}
        style={disabled ? styles.disabled : styles.touchable}
        onPress={!disabled ? handleSubmit: () => {}}
      >
        <Text style={styles.button}>Submit Comment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  star: {
    height: 25,
    width: 25,
    marginRight: 3,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  flatList: {
    alignSelf: "center",
    margin: 20,
  },
  input: {
    fontSize: 20,
    padding: 15,
    borderColor: COLORS.green,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },
  message: {
    color: COLORS.pink,
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  touchable: {
    borderRadius: 4,
    backgroundColor: COLORS.purple,
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  disabled: {
    borderRadius: 4,
    backgroundColor: "lightgray",
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    color: "#fff",
    padding: 15,
    textAlign: "center",
    fontFamily: "MavenPro-Medium",
    fontSize: 20,
  },
});
