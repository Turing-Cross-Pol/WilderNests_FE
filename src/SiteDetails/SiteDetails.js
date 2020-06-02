import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Linking
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { loadComments } from '../apiCalls';
// import AppLink from 'react-native-app-link';

import { COLORS, icons } from "../../assets/constants/constants";
import { CommentCard } from "../CommentCard/CommentCard";

export const SiteDetails = ({ route }) => {
  const navigation = useNavigation();

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
    average_rating,
    id,
    amenities,
  } = route.params;
  
  const displayPhoto = image_url 
    ? (<Image
        style={styles.image}
        source={{
          uri: image_url,
        }}
      />)
    : (<Image
        style={styles.image}
        source={require("../../assets/images/placeholder-image.png")}
      />);

  const [comments, setComments] = useState([]);
  let averageRating = average_rating;

  if (averageRating === "no comments") {
    averageRating = 0;
  }

  useEffect(() => {
    const newComments = loadComments(id);
    setComments(newComments);
  }, []);

  const getDirections = () => {
    // Will default to users current locaiton. Does not work in Expo Simulator (defaults to california.)
    // var url = `http://maps.google.com/?daddr=${lat},${lon}`;

    // Use this url below when demoing app.
    var url = `http://maps.google.com/?saddr=39.733635,-104.936145&daddr=${lat},${lon}`;
    Linking.openURL(url);
  };

  const createStarDisplay = (rating) => {
    const numStars = Math.ceil(rating);
    const filledStars = Array(numStars).fill(
      require("../../assets/images/filled-star.png")
    );
    const emptyStars = Array(5 - numStars).fill(
      require("../../assets/images/empty-star.png")
    );
    return filledStars.concat(emptyStars);
  };

  const amenityIcons = amenities.map((type) => icons[type]);

  const stars = createStarDisplay(averageRating);

  const handleRating = (index) => {
    const newRating = index + 1;
    navigation.navigate("Comment Form", { newRating, name, id });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.campsiteTitle}>{name}</Text>
      <Text style={styles.location}>
        {city}, {state}
      </Text>
      <View style={styles.starsContainer}>
        <FlatList
          numColumns={5}
          data={stars}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID={`star-${index}`}
              onPress={() => handleRating(index)}
            >
              <Image source={item} key={index} style={styles.star} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {!averageRating ? (
          <Text style={styles.averageRatingText}>No ratings yet</Text>
        ) : (
          <Text style={styles.averageRatingText}>
            Average Rating: {averageRating.toFixed(1)} out of {comments.length}{" "}
            reviews
          </Text>
        )}
      </View>
      {amenities.length && (
        <View style={styles.starsContainer}>
          <FlatList
            numColumns={7}
            data={amenityIcons}
            renderItem={({ item, index }) => (
              <Image testID="activity-icon" source={item} key={index} style={styles.star} />
            )}
            keyExtractor={(item, index) => index.toString()}
            listKey={(item, index) => index.toString()}
          />
        </View>
      )}
      {displayPhoto}
      <View style={styles.latLon}>
        <Text style={styles.unit}>
          Lat: <Text style={styles.coordinates}>{lat}</Text>
        </Text>
        <Text style={styles.unit}>
          Long: <Text style={styles.coordinates}>{lon}</Text>
        </Text>
      </View>
      <Text style={styles.header}>Description:</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.header}>Driving Tips:</Text>
      <Text style={styles.text}>{driving_tips}</Text>
      <Text style={styles.text}>Date added: {timestamps}</Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Comment Form", { name, id })}
        activeOpacity={0.7}
      >
        <Text style={styles.button}>Write a Comment/Review</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.touchable} 
        onPress={getDirections}
        activeOpacity={0.7}
      >
        <Text style={styles.button}>Get Directions</Text>
      </TouchableOpacity>
      <View style={styles.commentContainer}>
        <Text style={styles.header}>Reviews</Text>
        {comments.length ? (
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <CommentCard info={item} key={item.id} />
            )}
            listKey={(item) => item.id.toString()}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Comment Form", { name, id })}
          >
            <Text style={styles.noReviews}>
              No reviews yet. Click to leave a review.
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  campsiteTitle: {
    fontSize: 30,
    fontFamily: 'MavenPro-Medium',
  },
  location: {
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: "MavenPro-Medium",
    color: COLORS.purple,
  },
  starsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  averageRatingText: {
    paddingTop: 5,
  },
  image: {
    alignSelf: "center",
    width: 385,
    height: 200,
    marginBottom: 20,
  },
  latLon: {
    marginBottom: 20,
  },
  unit: {
    fontSize: 18,
  },
  coordinates: {
    color: COLORS.purple,
    fontFamily: "MavenPro-Medium",
    letterSpacing: 0.5,
  },
  header: {
    fontSize: 24,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '500'
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  star: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  touchable: {
    borderRadius: 4,
    backgroundColor: COLORS.purple,
    width: 300,
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
  commentContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  noReviews: {
    color: COLORS.purple,
    fontSize: 16,
    fontFamily: "MavenPro-Medium",
  },
});
