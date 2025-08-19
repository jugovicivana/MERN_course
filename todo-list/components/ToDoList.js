import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Todo from "./ToDo";

const ToDoList = () => {
  const [title, setTitle] = useState("ToDoList");
  const [text, setText] = useState("");
  const [list, setList] = useState(["Hello World"]);

  //add item
  const addItem = () => {
    const updatedList = list;
    updatedList.push(text);
    setList(updatedList);
    setText("");
  };

  //delete item
  const deleteItem = (index) => {
    const updatedList = list.filter((todo) => todo != index);
    setList(updatedList);
  };

  return (
    <View
      style={{ width: "80%", backgroundColor: "#e1ff00ff", marginBottom: 60 }}
    >
      <Text style={[styles.align, styles.font]}>{title}</Text>
      <ScrollView>
        {/* <Todo name={"First ToDo"} />
        <Todo name={"Second ToDo"} /> */}
        {list.map((x, index) => (
          <Todo key={index} item={x} index={index} delete={deleteItem}/>
        ))}
      </ScrollView>
      <View>
        <TextInput
          value={text}
          style={styles.input}
          onChangeText={(text) => setText(text)}
        ></TextInput>
        {/* <Button title="Add item" onPress={() => setTitle("My list")}> */}
        <Button title="Add item" onPress={addItem}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  align: {
    alignSelf: "center",
  },
  font: {
    fontVariant: "italic",
    color: "pink",
    fontSize: 20,
  },
  input: {
    borderRadius: 5,
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
  },
});
export default ToDoList;
