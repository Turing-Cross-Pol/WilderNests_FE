import React, { useState } from 'react';
import { data } from '../../sample-data.js'
import { ListCard } from "../ListCard/ListCard";
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'

export const ListView = () => {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.data}
        renderItem={({ item }) => <ListCard info={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});