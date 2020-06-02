import React, { useState } from "react";
import { COLORS, icons } from "../../assets/constants/constants";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const QuickView = ({ campsite }) => {
  const {
    name,
    city,
    state,
    description,
    average_rating,
    amenities,
  } = campsite;
  let averageRating = average_rating;
  if (averageRating === "no comments") {
    averageRating = 0;
  }
  const navigation = useNavigation();

  const createStarDisplay = (averageRating) => {
    const numStars = Math.ceil(averageRating);
    const filledStars = Array(numStars).fill(
      require("../../assets/images/filled-star.png")
    );
    const emptyStars = Array(5 - numStars).fill(
      require("../../assets/images/empty-star.png")
    );
    return filledStars.concat(emptyStars);
  };

  const stars = createStarDisplay(averageRating);

  const amenityIcons = amenities.map((type) => icons[type]);

  const navigateToDetails = () => {
    navigation.navigate("Details", { ...campsite });
  };

  const descriptionSnippet = description && description.slice(0, 150) + "...";
  const cityState = !!city && !!state;
  const location = (
    <Text style={styles.location}>
      {city}, {state}
    </Text>
  );

  return (
    <TouchableOpacity onPress={navigateToDetails} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      {cityState && location}
      <View style={styles.starsContainer}>
        <FlatList
          numColumns={5}
          data={stars}
          renderItem={({ item, index }) => (
            <Image source={item} key={index} style={styles.star} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {amenities.length && (
        <View style={styles.starsContainer}>
          <FlatList
            numColumns={7}
            data={amenityIcons}
            renderItem={({ item, index }) => (
              <Image source={item} key={index} style={styles.star} />
            )}
            keyExtractor={(item, index) => index.toString()}
            listKey={(item, index) => index.toString()}
          />
        </View>
      )}
      {!averageRating && <Text>No ratings yet</Text>}
      <Text style={styles.description}>{descriptionSnippet}</Text>
      <Text style={styles.moreDetails}>Cick for more details ></Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#f1f1f1",
    position: "absolute",
    bottom: -30,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
  },
  name: {
    fontFamily: "MavenPro-Medium",
    fontSize: 25,
    color: COLORS.green,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  moreDetails: {
    textAlign: "center",
    color: COLORS.purple,
    fontFamily: "MavenPro-Medium",
    letterSpacing: 1,
  },
  starsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    marginTop: 10,
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 3,
  },
});
