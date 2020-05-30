import React, { useState } from "react";
import { COLORS } from "../../assets/constants/constants";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const QuickView = ({ campsite }) => {
  const { name, city, state, description } = campsite;
  const navigation = useNavigation();

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
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
  },
  moreDetails: {
    textAlign: "center",
    color: COLORS.purple,
    fontFamily: 'MavenPro-Medium',
    letterSpacing: 1,
  }
});
