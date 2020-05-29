import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { COLORS } from "../../assets/constants/constants";
import { ListView } from "../ListView/ListView";
import { MapView } from "../MapView/MapView";

export const ToggleView = () => {
  const [currentPage, setCurrentPage] = useState("List View");
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toggleBox}>
        <TouchableOpacity
          onPress={() => setCurrentPage("List View")}
          style={
            currentPage === "List View" ? styles.selected : styles.unselected
          }
        >
          <Text
            style={
              currentPage === "List View"
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            List View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentPage("Map View")}
          style={
            currentPage === "Map View" ? styles.selected : styles.unselected
          }
        >
          <Text
            style={
              currentPage === "Map View"
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            Map View
          </Text>
        </TouchableOpacity>
      </View>
      {currentPage === "List View" ? <ListView /> : <MapView />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  selected: {
    backgroundColor: COLORS.purple,
    flex: 1,
    padding: 8,
  },
  selectedText: {
    color: "#FFF",
    textAlign: "center",
  },
  unselectedText: {
    textAlign: "center",
  },
  unselected: {
    flex: 1,
    padding: 8,
    backgroundColor: "#f1f1f1",
  },
});
