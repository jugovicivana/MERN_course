import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Appbar,
  Card,
  List,
  RadioButton,
  Text,
  Button,
} from "react-native-paper";

import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";

import EasyButton from "../../../shared/StyledComponents/EasyButton";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  {
    name: "MasterCard",
    value: 3,
  },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  console.log(order);
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text
        variant="titleMedium"
        style={{ alignSelf: "center", marginTop: 10 }}
      >
        Choose your payment method
      </Text>

      <ScrollView style={{ backgroundColor: "white", padding: 10 }}>
        {methods.map((method) => (
          <List.Item
            key={method.value}
            title={method.name}
            onPress={() => setSelected(method.value)}
            right={(props) =>
              selected === method.value ? (
                <List.Icon {...props} icon="check" />
              ) : null
            }
            style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}
          />
        ))}
        {selected == 3 ? (
          <>
            <View style={{ marginTop: 10 }}>
              <Text
                variant="titleMedium"
                style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
              >
                Choose your payment method
              </Text>
            </View>
            <Dropdown
              style={{ marginTop: 20, padding: 10 }}
              data={paymentCards}
              labelField="name"
              valueField="value"
              placeholder="Select"
              value={card}
              onChange={(item) => setCard(item.value)}
            />
          </>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <EasyButton
          medium secondary
            onPress={() => props.navigation.navigate("Confirm", { order })}
          >
            <Text style={{ color: "white" }}>Confirm</Text>
          </EasyButton>
        </View>
      </ScrollView>
    </View>
  );
};
export default Payment;
