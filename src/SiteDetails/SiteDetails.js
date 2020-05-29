import React from "react";
import { Text, Image, ScrollView, StyleSheet, Button } from "react-native";

export const SiteDetails = ({ route }) => {
  const {image, name, city, state, lat, long, description, drivingTips, timestamps } = route.params;
  const photo = image ? image : 'https://place-hold.it/300x500'

  const getDirections = () => {
    console.log('directions')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <Text style={styles.text}>{city}, {state}</Text>
      <Image
        style={styles.image}
        source={{
          uri: photo,
        }}
      />
      <Text style={styles.text}>Lat: {lat}</Text>
      <Text style={styles.text}>Long: {long}</Text>
      <Text style={styles.header}>Description:</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.header}>Driving Tips:</Text>
      <Text style={styles.text}>{drivingTips}</Text>
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
    margin: 10
  },
  text: {
    margin: 10
  },
  image: {
    alignSelf: "center",
    width: 400,
    height: 200,
    marginLeft: 20,
    marginRight: 20
  },
});