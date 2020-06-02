import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../assets/constants/constants";

export const Filter = () => {
  const [expanded, setExpanded] = useState("");
  const [selected, setSelected] = useState("");
  const handleFilter = (selected) => {
    setSelected(selected);
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
  <Text style={styles.button}>Filter {!!expanded && "(hide)"}</Text>
      </TouchableOpacity>
      {!!expanded && (
        <View>
          <TouchableOpacity
            style={styles.checkContainer}
            onPress={() => handleFilter("horse")}
            testID="Horse Trails"
          >
            <Image
              style={styles.icon}
              // source={amenities.includes("horse") ? fullCheck : emptyCheck}
            />
            <Text style={styles.label}>Horse Trails</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    // color: COLORS.green,
    padding: 5,
    textAlign: "center",
    fontFamily: "MavenPro-Medium",
    fontSize: 20,
  },
  touchable: {
    backgroundColor: COLORS.cream,
    alignSelf: "stretch",
  },
});
