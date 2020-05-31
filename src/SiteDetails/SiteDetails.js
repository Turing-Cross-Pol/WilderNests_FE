import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  View,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../assets/constants/constants";
import { CommentCard } from '../CommentCard/CommentCard';

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
    rating,
    id,
  } = route.params;
  const photo = image_url ? image_url : "https://place-hold.it/300x500";

  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadAverageRating();
  }, []);

  const loadAverageRating = async () => {
    const response = await fetch(`https://dpcamping-be-stage.herokuapp.com/campsites/${id}/comments`);
    const comments = await response.json();
    console.log('comments', comments);
    setComments(comments)
  }
  
  const getDirections = () => {
    console.log("directions");
  };

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

  const stars = createStarDisplay(rating);

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
            <TouchableOpacity onPress={() => handleRating(index)}>
              <Image source={item} key={index} style={styles.star} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
      <Image
        style={styles.image}
        source={{
          uri: photo,
        }}
      />
      <View style={styles.latLon}>
        <Text style={styles.unit}>Lat: <Text style={styles.coordinates}>{lat}</Text></Text>
        <Text style={styles.unit}>Long: <Text style={styles.coordinates}>{lon}</Text></Text>
      </View>
      <Text style={styles.header}>Description:</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.header}>Driving Tips:</Text>
      <Text style={styles.text}>{driving_tips}</Text>
      <Text style={styles.text}>Date added: {timestamps}</Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Comment Form", { name, id })}
      >
        <Text style={styles.button}>Write a Comment/Review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={getDirections}>
        <Text style={styles.button}>Get Directions</Text>
      </TouchableOpacity>
      <View style={styles.commentContainer}>
        <Text style={styles.header}>Reviews</Text>
        {comments.length 
          ? (<FlatList 
              data={comments}
              renderItem={({ item }) => <CommentCard info={item} stars={stars} />}
              keyExtractor={item => item.id}
            />)
          : (<TouchableOpacity onPress={() => navigation.navigate("Comment Form", { name, id })}><Text style={styles.noReviews}>No reviews yet. Click to leave a review.</Text></TouchableOpacity>)
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  campsiteTitle: {
    fontSize: 25,
    fontFamily: 'MavenPro-Medium',
  },
  location: {
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: 'MavenPro-Medium',
    color: COLORS.purple,
  },
  starsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    alignSelf: "center",
    width: 400,
    height: 200,
    marginBottom: 20,
  },
  latLon: {
    marginBottom: 20,
  },  
  unit: {
    fontSize:18,
  },
  coordinates: {
    color: COLORS.purple,
    fontFamily: 'MavenPro-Medium',
    letterSpacing: .5,
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
  star: {
    height: 20,
    width: 20,
    marginRight: 3,
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
    fontFamily: 'MavenPro-Medium',
  }
});
