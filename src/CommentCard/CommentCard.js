import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../assets/constants/constants";

export const CommentCard = ({ info }) => {
  const { id, campsite_id, description, title, rating } = info;

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
  
  return (
    <View style={styles.commentCard}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.starsContainer}>
        <FlatList
          numColumns={5}
          data={stars}
          renderItem={({ item, index }) => (
            <Image source={item} key={item.id} style={styles.star} />
          )}
          listKey={(item, index) => index.toString()}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentCard: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'MavenPro-Medium',
  },
  starsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 3,
  },
  description: {
    fontSize: 16,
  },
});