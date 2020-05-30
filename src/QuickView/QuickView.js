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


