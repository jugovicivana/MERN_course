// screens/cart/Cart.js
import React from "react";
import { Text, Button } from "react-native-paper";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../../redux/slices/cartSlice";
import CartItem from "./CartItem";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItems.items);
  const dispatch = useDispatch();

  var total = 0;
  cartItems.forEach((element) => {
    return (total += element.product.price * element.quantity);
  });

  const handleDelete = (item) => {
    dispatch(removeFromCart(item.product._id));
  };

  return (
    <View style={styles.mainContainer}>
      {cartItems.length ? (
        <>
          <Text variant="headlineLarge" style={styles.title}>
            Cart
          </Text>

          <View style={styles.listContainer}>
            <SwipeListView
              data={cartItems}
              keyExtractor={(item, index) => `${item.product._id}-${index}`}
              renderItem={({ item }) => <CartItem item={item} />}
              renderHiddenItem={({ item }) => (
                <View style={styles.hiddenItem}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(removeFromCart(item.product._id.$oid));
                    }}
                    style={styles.deleteButton}
                  >
                    <Icon name="trash" color={"white"} size={30} />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
              contentContainerStyle={styles.listContent}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.price}>${total.toFixed(2)}</Text>
            <View style={styles.buttonsContainer}>
              <Button
                mode="outlined"
                onPress={() => dispatch(clearCart())}
                style={styles.button}
              >
                Clear Cart
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  console.log(
                    "++++++++++++++++OVDJE GLEDAJ - CART++++++++++++++"
                  );
                  console.log(cartItems);
                  props.navigation.navigate("Checkout", {
                    screen: "Shipping",
                    params: { cartItems: cartItems },
                  });
                }}
                style={styles.button}
              >
                Checkout
              </Button>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            name="shopping-cart"
            size={60}
            color="#ccc"
            style={styles.emptyIcon}
          />
          <Text variant="titleMedium" style={styles.emptyText}>
            Looks like your cart is empty
          </Text>
          <Text variant="labelSmall" style={styles.emptySubtext}>
            Add products to your cart to get started
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FAF9EE",
  },
  title: {
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 100, // Dodajemo prostor za bottom container
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e91e63",
    // marginBottom: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    minWidth: 120,
  },
  hiddenItem: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  emptySubtext: {
    textAlign: "center",
    color: "#888",
  },
});

export default Cart;
