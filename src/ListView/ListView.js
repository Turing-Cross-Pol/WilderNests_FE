import React, { useState } from "react";
import { data } from "../../sample-data.js";
import { ListCard } from "../ListCard/ListCard";
import {
  FlatList,
  StyleSheet,
  View
} from "react-native";

export const ListView = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data.data}
        renderItem={({ item }) => <ListCard info={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
