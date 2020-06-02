import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../../assets/constants/constants";
import { useNavigation } from "@react-navigation/native";

export const ListCard = ({ info }) => {
  const { name, city, state, image_url, average_rating, amenities } = info;

  let averageRating = average_rating;
  if (averageRating === "no comments") {
    averageRating = 0;
  }
  const imageUrl = image_url ? image_url : "https://place-hold.it/300x500";
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

  const icons = {
    boat: require("../../assets/images/boat-icon.png"),
    atv: require("../../assets/images/atv-icon.png"),
    bike: require("../../assets/images/bike-icon.png"),
    fire: require("../../assets/images/fire-icon.png"),
    fish: require("../../assets/images/fish-icon.png"),
    hike: require("../../assets/images/hike-icon.png"),
    horse: require("../../assets/images/horse-icon.png"),
  };

  const amenityIcons = amenities.map((type) => icons[type]);

  const stars = createStarDisplay(averageRating);

  const handleCardPress = () => {
    navigation.navigate("Details", { ...info });
  };

  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.listItem}>
      <Image
        testID="data-img"
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.meta}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.starsContainer}>
          <FlatList
            numColumns={5}
            data={stars}
            renderItem={({ item, index }) => (
              <Image source={item} key={index} style={styles.star} />
            )}
            keyExtractor={(item, index) => index.toString()}
            listKey={(item, index) => index.toString()}
          />
        </View>
        {amenities.length && 
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
        }
        {!averageRating && <Text>No ratings yet</Text>}
        <Text style={styles.location}>
          {city}, {state}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: "#333",
    borderBottomWidth: 2,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 15,
    flex: 1,
  },
  meta: {
    flex: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: "MavenPro-Medium",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    fontFamily: "MavenPro-Medium",
    color: COLORS.green,
  },
  starsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 3,
  },
});
