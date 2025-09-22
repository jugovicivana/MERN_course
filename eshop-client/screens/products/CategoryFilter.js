import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { List, Text, Badge } from "react-native-paper";
import { MD3Colors } from "react-native-paper";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: MD3Colors.tertiary70,  }}
    >
      {/* <List.Item style={{ margin: 0, padding: 0, borderRadius: 0 }}> */}
      <TouchableOpacity
        key={1}
        onPress={() => {
          props.categoryFilter("all"), props.setActive(-1);
        }}
      >
        <Badge
          style={[
            styles.center,
            { margin: 5, marginVertical:10 },
            props.active == -1 ? styles.active : styles.inactive,
          ]}
        >
          <Text style={{ color: "#5D688A" }}>All</Text>
        </Badge>
      </TouchableOpacity>
      {props.categories.map((item) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => {
            props.categoryFilter(item._id),
              props.setActive(props.categories.indexOf(item));
          }}
        >
          <Badge
            style={[
              styles.center,
            { margin: 5, marginVertical:10 },
              props.active == props.categories.indexOf(item)
                ? styles.active
                : styles.inactive,
            ]}
          >
            <Text style={{ color: "#5D688A" }}>{item.name}</Text>
          </Badge>
        </TouchableOpacity>
      ))}
      {/* </List.Item> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3Colors.primary80,
  },
  active: {
    backgroundColor: "#F7A5A5",
  },
  inactive: {
    backgroundColor: "#FFDBB6",
  },
});

export default CategoryFilter;
