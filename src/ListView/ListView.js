import React, { useState } from "react";
import { ListCard } from "../ListCard/ListCard";
import { Filter } from "../Filter/Filter";
import { FlatList, StyleSheet, View } from "react-native";

export const ListView = ({ data }) => {
  const [selected, setSelected] = useState([]);

  let options = data.filter((data) => data.city && data.state);
  options = options.map((data) => data.city + ", " + data.state);
  options = [...new Set(options)];
  options = options.sort();

  const display = selected.length
    ? data.filter((data) => selected.includes(data.city + ", " + data.state))
    : data;

  return (
    <View style={styles.container}>
      <Filter setSelected={setSelected} options={options} />
      <FlatList
        data={display}
        renderItem={({ item }) => <ListCard info={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
