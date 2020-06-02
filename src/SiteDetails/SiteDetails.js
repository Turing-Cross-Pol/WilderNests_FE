import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
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
    average_rating,
    id,
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
    loadComments();
  }, []);

  const loadComments = async () => {
    const response = await fetch(`https://dpcamping-be-stage.herokuapp.com/campsites/${id}/comments`);
    const newComments = await response.json();
  
    setComments(newComments[0])
  }
  
  const getDirections = () => {
    console.log("directions");
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
        {!averageRating ? <Text style={styles.averageRatingText}>No ratings yet</Text> : <Text style={styles.averageRatingText}>Average Rating: {averageRating.toFixed(1)} out of {comments.length} reviews</Text>}
      </View>
      {displayPhoto}
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
        {comments.length 
          ? (<FlatList 
              data={comments}
              renderItem={({ item }) => <CommentCard info={item} stars={stars} key={item.id} />}
              listKey={(item) => item.id.toString()}
              keyExtractor={(item) => item.id.toString()}
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
    flexDirection: "column",
    marginBottom: 20,
  },
  averageRatingText: {
    paddingTop: 5,
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
