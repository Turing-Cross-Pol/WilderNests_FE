import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/constants/constants';
import { useNavigation } from '@react-navigation/native';

export const ListCard = ({ info }) => { 
  const { name, city, state, image } = info;
  const imageUrl = image ? image : 'https://place-hold.it/300x500';
  const navigation = useNavigation();

  const handleCardPress = () => {
    console.log('open card')
    navigation.navigate("Details", {...info})
  }
  
  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.listItem}>
      <Image
        style={styles.image} 
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.meta}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.location}>{city}, {state}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 15,
    flex: 1,
  },
  meta: {
    flex: 4
  },
  title: {
    fontSize: 24,
    fontFamily: 'MavenPro-Medium',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    fontFamily: 'MavenPro-Medium',
    color: COLORS.green,
  }
});