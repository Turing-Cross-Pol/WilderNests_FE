import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const emptyCheck = require("../../assets/images/checkbox.png");
const fullCheck = require("../../assets/images/done.png");

export const PostForm = () => {
  const [amenities, setAmenities] = useState([]);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [description, setDescription] = useState('');
  const [directionInfo, setDirectionInfo] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleAmenities = (amenity) => {
    if (amenities.includes(amenity)) {
      const filteredAmenities = amenities.filter((am) => am !== amenity);
      setAmenities(filteredAmenities);
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleInputChange = (value, func) => {
    func(value);
  };

  const handleSubmit = () => {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Tell us about your campsite</Text>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Campsite Title"
        value={title}
        onChangeText={(value) => handleInputChange(value, setTitle)}
      />
      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Closest city/town"
        value={city}
        onChangeText={(value) => handleInputChange(value, setCity)}
      />
      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={(value) => handleInputChange(value, setState)}
      />
      <Text style={styles.label}>Lat:</Text>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={lat}
        onChangeText={(value) => handleInputChange(value, setLat)}
      />
      <Text style={styles.label}>Long:</Text>
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={long}
        onChangeText={(value) => handleInputChange(value, setLong)}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="A brief description of the site including details about the surroundings"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(value) => handleInputChange(value, setDescription)}
      />
      <Text style={styles.label}>Directions:</Text>
      <TextInput
        style={styles.input}
        placeholder="How far is it from major roads? Any tips for landmarks to look out for?"
        multiline={true}
        numberOfLines={4}
        value={directionInfo}
        onChangeText={(value) => handleInputChange(value, setDirectionInfo)}
      />
      <Text style={styles.label}>Image:</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imgUrl}
        onChangeText={(value) => handleInputChange(value, setImgUrl)}
      />
      <Text style={styles.text}>Available Amenities Nearby:</Text>
      <View style={styles.allCheckboxes}>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("Firepit")}
          testID='Firepit'
        >
          <Image
            style={styles.icon}
            source={amenities.includes("Firepit") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Firepit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("Boating/Water")}
          testID='Boating/Water'
        >
          <Image
            style={styles.icon}
            source={
              amenities.includes("Boating/Water") ? fullCheck : emptyCheck
            }
          />
          <Text style={styles.label}>Boating/Water</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("Fishing")}
          testID='Fishing'
        >
          <Image
            style={styles.icon}
            source={amenities.includes("Fishing") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Fishing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("Mountain Biking Trails")}
          testID='Mountain Biking Trails'
        >
          <Image
            style={styles.icon}
            source={
              amenities.includes("Mountain Biking Trails")
                ? fullCheck
                : emptyCheck
            }
          />
          <Text style={styles.label}>Mountain Biking Trails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("ATV Trails")}
          testID='ATV Trails'
        >
          <Image
            style={styles.icon}
            source={amenities.includes("ATV Trails") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>ATV Trails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("Horse Trails")}
          testID='Horse Trails'
        >
          <Image
            style={styles.icon}
            source={amenities.includes("Horse Trails") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Horse Trails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("Hiking Trails")}
          testID='Hiking Trails'
        >
          <Image
            style={styles.icon}
            source={
              amenities.includes("Hiking Trails") ? fullCheck : emptyCheck
            }
          />
          <Text style={styles.label}>Hiking Trails</Text>
        </TouchableOpacity>
      </View>
      <Button
        onPress={handleSubmit}
        title="Submit Campsite"
        color={"#7E62CF"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    marginTop: 30
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
    color: "#537A72",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "#7E62CF",
  },
  input: {
    fontSize: 20,
    padding: 15,
    borderBottomColor: "#537A72",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  allCheckboxes: {
    marginBottom: 10
  },
  checkContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
});