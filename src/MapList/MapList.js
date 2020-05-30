import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";
import { QuickView } from "../QuickView/QuickView";

export const MapList = ({ data }) => {
  const [selectedCampsite, setSelectedCampsite] = useState(null);

  const matchCampsiteData = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    let foundSite = data.find(
      (site) => site.lat === latitude && site.lon === longitude
    );
    setSelectedCampsite(foundSite);
  };

  const markers = data.map((location) => {
    let { lat, lon } = location;
    
    return (
      <Marker
        key={location.id}
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
        initialRegion={{
          latitude: 39.833556,
          longitude: -105.648361,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        showsScale={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
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
