import React from "react";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { COLORS } from '../../assets/constants/constants';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

export const Landing = ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    'PatuaOne-Regular': require('../../assets/fonts/PatuaOne-Regular.ttf'),
    'MavenPro-Regular': require('../../assets/fonts/MavenPro-Regular.ttf'),
    'MavenPro-Medium': require('../../assets/fonts/MavenPro-Medium.ttf')
  });

  const handleListView = () => {
    navigation.navigate("Toggle View"); 
  };

  const handlePostForm = () => {
    navigation.navigate("Post"); 
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/landing-bg.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.logoBlock}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/tent-icon.png")}
            />
            <Text style={styles.typeBlock}>WilderNests</Text>
            <Text style={styles.tagline}>A guide to dispersed camping</Text>
          </View>
          <View style={styles.buttonBlock}>
            <TouchableOpacity 
              style={styles.touchable}
              onPress={() => handleListView()}
              activeOpacity={0.7}
            >
              <Text style={styles.button}>Find a Campsite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePostForm()}
              style={styles.touchable}
              activeOpacity={0.7}
            >
              <Text style={styles.button}>Post a Campsite</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    padding: 20,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoBlock: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 127,
    height: 97,
    marginBottom: 20,
    marginTop: 100,
  },
  typeBlock: {
    fontSize: 50,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
    fontFamily: 'PatuaOne-Regular'
  },
  tagline: {
    fontSize: 18,
    color: "#fff",
  },
  buttonBlock: {
    fontSize: 20,
    flex: 2,
  },
  touchable: {
    borderRadius: 4,
    backgroundColor: COLORS.purple,
    marginBottom: 20,
  },
  button: {
    color: "#fff",
    padding: 15,
    textAlign: 'center',
    fontFamily: 'MavenPro-Medium',
    fontSize: 24,
  },
});
