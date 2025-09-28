import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Orders from "../screens/admin/Orders";
import Products from "../screens/admin/Products";
import ProductForm from "../screens/admin/ProductForm";
import Categories from "../screens/admin/Categories";


const Stack = createStackNavigator();

function MyStack() { 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
            title:'Products',
        }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          title: "Categories",
        }}
      />
       <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          title: "Orders",
        }}
      />
       <Stack.Screen
        name="ProductForm"
        component={ProductForm}
        options={{
          title: "Product Form",
        }}
      />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
