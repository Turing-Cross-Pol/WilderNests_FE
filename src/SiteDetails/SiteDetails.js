import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

export const SiteDetails = ({ route }) => {
  console.log(route)
  const image = route.image ? route.image : 'https://place-hold.it/300x500'

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text>{route.name}</Text>
      <Text>{route.city}</Text>
      <Text>{route.state}</Text>
      <Text>{route.lat}</Text>
      <Text>{route.long}</Text>
      <Text>{route.description}</Text>
      <Text>{route.drivingTips}</Text>
      <Text>Date added: {route.timestamps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#333',
    padding: 10
  },
  image: {
    width: 100,
    height: 100,
  },
});