import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker } from 'react-native-maps';
import { data } from "../../sample-data.js";


export const MapList = () => {

  const markers = data.data.map(location => {
    let {lat, long} = location;
    console.log(lat, long)
    return (<Marker
      key={location.id}
      coordinate={{latitude: lat, longitude: long}}
    />)
  })

  return (
    <View style={styles.container}>
      <MapView 
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 129,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 30,
  },
});