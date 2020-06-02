import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";
import { QuickView } from "../QuickView/QuickView";
import * as Location from 'expo-location';

export const MapList = ({ data }) => {  
  const [selectedCampsite, setSelectedCampsite] = useState(null);
  const [location, setLocation] = useState({
    coords: {
      latitude: 39.833556,
      longitude: -105.648361
    }
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const matchCampsiteData = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    let foundSite = data.find(
      (site) => site.lat === latitude && site.lon === longitude
    );
    setSelectedCampsite(foundSite);
  };

  const markers = data.map((location) => {
    let { lat, lon, id } = location;
    
    return (
      <Marker
        key={id.toString()}
        coordinate={{ latitude: lat, longitude: lon }}
        image={require("../../assets/images/tent-location-icon.png")}
        onSelect={(e) => matchCampsiteData(e)}
      />
    );
  });

  return (
    <View style={styles.container}>
      <MapView
        onMarkerDeselect={() => setSelectedCampsite(null)}
        style={styles.mapStyle}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        showsScale={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
      >
        {markers}
      </MapView>
      {selectedCampsite && (
        <QuickView
          campsite={selectedCampsite}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 129,
    position: 'relative',
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
  },
});
