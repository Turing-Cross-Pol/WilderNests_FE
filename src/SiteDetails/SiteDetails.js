import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

export const SiteDetails = ({ route }) => {
  const {image, name, city, state, lat, long, description, drivingTips, timestamps } = route.params;
  const photo = image ? image : 'https://place-hold.it/300x500'
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: photo,
        }}
      />
      <Text>{name}</Text>
      <Text>{city}</Text>
      <Text>{state}</Text>
      <Text>{lat}</Text>
      <Text>{long}</Text>
      <Text>{description}</Text>
      <Text>{drivingTips}</Text>
      <Text>Date added: {timestamps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 100,
    height: 100,
  },
});