import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { COLORS } from "../../assets/constants/constants";

export const Filter = ({ setSelected, options }) => {
  const [expanded, setExpanded] = useState("");
  const [checked, setChecked] = useState([]);

  const handleFilter = (option) => {
    let selectedArray = [...checked];
    if (checked.includes(option)) {
      const filtered = selectedArray.filter((box) => box !== option);
      setChecked(filtered);
      setSelected(filtered);
    } else {
      selectedArray.push(option);
      setSelected(selectedArray);
      setChecked(selectedArray);
    }
  };
  const emptyCheck = require("../../assets/images/checkbox.png");
  const fullCheck = require("../../assets/images/done.png");

  const toggleExpanded = () => {
    if (expanded) {
      setExpanded("");
    } else {
      setExpanded("expanded");
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.touchable} onPress={toggleExpanded}>
        <Text style={styles.button}>Filter {!!expanded ? "(hide)" : "(expand)"}</Text>
      </TouchableOpacity>
      {!!expanded && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.checkContainer}
                onPress={() => handleFilter(item)}
              >
                <Image
                  style={styles.icon}
                  source={checked.includes(item) ? fullCheck : emptyCheck}
                />
                <Text style={styles.label}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
    color: COLORS.green,
  },
  checkContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  button: {
    padding: 5,
    textAlign: "center",
    fontFamily: "MavenPro-Medium",
    fontSize: 20,
  },
  touchable: {
    backgroundColor: COLORS.cream,
    alignSelf: "stretch",
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
});
