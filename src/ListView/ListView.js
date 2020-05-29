import React, { useState } from "react";
import { data } from "../../sample-data.js";
import { ListCard } from "../ListCard/ListCard";
import { ToggleView } from '../ToggleView/ToggleView';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";

export const ListView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ToggleView currentPage='listView' />
      <FlatList
        data={data.data}
        renderItem={({ item }) => <ListCard info={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row"
  }
});
