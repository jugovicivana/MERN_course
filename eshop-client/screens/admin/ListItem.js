import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { List, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");
const ListItem = ({ product, navigation, index, deleteProduct }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} color={"#FAA533"} />
            </TouchableOpacity>
            <EasyButton
              medium
              secondary
              onPress={() => {
                navigation.navigate("ProductForm", {item:product});
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>

            <EasyButton
              medium
              danger
              onPress={() => [deleteProduct(product._id), setModalVisible(false)]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Product Detail",
            params: { item: product },
          })
        }
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.listItem,
          { backgroundColor: index % 2 === 0 ? "white" : "gainsboro" },
        ]}
      >
        <Image
          source={{
            uri: product.image
              ? product.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.item}>{product.brand}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.item}>
          {product.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.item}>
          {product.category.name}
        </Text>
        <Text style={styles.item}>$ {product.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    width: width / 6,
    height: width / 6,
    margin: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  listItem: {
    flexDirection: "row",
    padding: 5,
    width: width,
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ListItem;
