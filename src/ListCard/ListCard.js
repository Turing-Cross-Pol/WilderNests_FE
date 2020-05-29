import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const ListCard = ({ info }) => { 
  console.log(info)
  const image = info.image ? info.image : 'https://place-hold.it/300x500'

  return (
    <View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});