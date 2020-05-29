import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { COLORS } from "../../assets/constants/constants";

export const ToggleView = ({ currentPage }) => {
  return (
    <View style={styles.toggleBox}>
      <TouchableOpacity style={currentPage === 'listView' ? styles.selected : styles.unselected}>
        <Text style={currentPage === 'listView' ? styles.selectedText : styles.unselectedText}>List View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={currentPage === 'mapView' ? styles.selected : styles.unselected}>
        <Text style={currentPage === 'mapView' ? styles.selectedText : styles.unselectedText}>Map View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleBox: {
    flexDirection: "row"
  },
  selected: {
    backgroundColor: COLORS.purple,
    flex: 1,
    padding: 8,
  },
  selectedText: {
    color: "#FFF",
    textAlign: "center"
  },
  unselectedText: {
    textAlign: "center"
  },
  unselected: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f1f1f1',
  }
})
