import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export const ListCard = ({ info }) => { 
  console.log(info)
  const image = info.image ? info.image : 'https://place-hold.it/300x500'

  const handleCardPress = () => {
    console.log('open card')
  }
  
  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.listItem}>
      <Image
        style={styles.image} 
        source={{
          uri: image,
        }}
      />
      <Text>{info.name}</Text>
      <Text>{info.city}</Text>
      <Text>{info.state}</Text>
      <Text>{info.lat}</Text>
      <Text>{info.long}</Text>
      <Text>{info.description}</Text>
      <Text>{info.drivingTips}</Text>
      <Text>Date added: {info.timestamps}</Text>
    </TouchableOpacity>
  )
}

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