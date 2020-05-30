import React from "react";
import { Text, Image, ScrollView, StyleSheet, Button } from "react-native";

export const SiteDetails = ({ route }) => {
  const {
    image_url,
    name,
    city,
    state,
    lat,
    lon,
    description,
    driving_tips,
    timestamps,
  } = route.params;
  const photo = image_url ? image_url : "https://place-hold.it/300x500";

  const getDirections = () => {
    console.log("directions");
  };

  const createStarDisplay = rating => {
    const numStars = rating ? Math.ceil(rating) : 0;
    const filledStars = Array(numStars).fill(
      `../../assets/images/filled-star.png`
    );
    const emptyStars = Array(10 - numStars).fill(
      `../../assets/images/empty-star.png`
    );
    userStars = filledStars.concat(emptyStars).map((star, index) => {
      return (
        <Image key={index} style={styles.star} souce={`${star}`} />
      );
    });
  };

  const stars = createStarDisplay();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      {stars}
      <Text style={styles.text}>
        {city}, {state}
      </Text>
      <Image
        style={styles.image}
        source={{
          uri: photo,
        }}
      />
      <Text style={styles.text}>Lat: {lat}</Text>
      <Text style={styles.text}>Long: {lon}</Text>
      <Text style={styles.header}>Description:</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.header}>Driving Tips:</Text>
      <Text style={styles.text}>{driving_tips}</Text>
      <Text style={styles.text}>Date added: {timestamps}</Text>
      <Button
        onPress={getDirections}
        title="Get Directions"
        color={"#7E62CF"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    width: 250,
    margin: 10,
  },
  text: {
    margin: 10,
  },
  star: {
    height: 10,
    width: 10
  },
  image: {
    alignSelf: "center",
    width: 400,
    height: 200,
    marginLeft: 20,
    marginRight: 20,
  },
});
