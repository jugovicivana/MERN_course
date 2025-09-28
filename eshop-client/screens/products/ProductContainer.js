import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ProductList from "./ProductList";
import {
  Appbar,
  Searchbar,
  IconButton,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import SearchedProduct from "./SearchedProducts";
import { MD3Colors } from "react-native-paper";
import Banner from "../../shared/Banner";
import CategoryFilter from "./CategoryFilter";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
const data = require("../../assets/data/products.json");
const categoriesFile = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [productsCategories, setProductsCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCategories(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Greška prilikom fetcha: ", err.message);
        });

      //categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log("Greška prilikom fetcha: ", err.message);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProduct = (query) => {
    setSearchQuery(query);
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  //Category
  const changeCategory = (ctg) => {
    if (ctg === "all") {
      setProductsCategories(initialState);
      setActive(true);
    } else {
      // Provjerite da li kategorija postoji prije nego što pristupite $oid
      const filteredProducts = products.filter(
        (i) => i.category && i.category._id === ctg
      );
      setProductsCategories(filteredProducts);
      setActive(true);
    }
  };
  return (
    <>
      {loading == false ? (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Appbar.Header
            style={{ marginTop: 0, paddingTop: 0, backgroundColor: "#ffffff" }}
            statusBarHeight={1}
          >
            <Searchbar
              placeholder="Search"
              value={searchQuery}
              onFocus={openList}
              onBlur={onBlur}
              onChangeText={searchProduct}
              style={styles.searchbar}
              inputStyle={{ fontSize: 16 }}
            />

            {/* Cancel / close dugme */}
            {focus && (
              <IconButton
                icon="close"
                onPress={onBlur}
                size={24}
                style={{ marginRight: 0 }}
              />
            )}
          </Appbar.Header>

          {focus ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView contentContainerStyle={{ paddingBottom: 150, backgroundColor:'white' }}>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCategory}
                    productsCategories={productsCategories}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCategories.length > 0 ? (
                  <View style={styles.listContainer}>
                    {/* <FlatList
                numColumns={2}
                data={products}
                renderItem={({ item }) => (
                  <ProductList key={item._id} item={item} />
                )}
                keyExtractor={(item) => item._id.toString()}
              /> */}
                    {productsCategories.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          route={props.route}
                          key={item.name}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: "20%", margin: 10 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        <View style={[styles.indicator, { backgroundColor: "white" }]}>
          <ActivityIndicator size={"large"} color="red" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  listContainer: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ffffff",
    //height: height,
    // marginBottom:50
    // justifyContent: "space-between", // opciono da kartice stoje lepše
    paddingBottom: 50, // da ne bude "odsečeno" dole
  },
  searchbar: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ECEEDF",
    // elevation: 0, // uklanja senku ako je potrebno
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3Colors.tertiary70,
    borderRadius: 25,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
});

export default ProductContainer;
