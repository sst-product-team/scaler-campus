import { View, Text } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Dates from "./Dates";

const DateList = () => {
  return (
    <ScrollView horizontal={true}>
      <View className="flex-row pl-4">
        <Dates otherstyles=""></Dates>
        <Dates otherstyles="bg-[#333333]"></Dates>
        <Dates otherstyles="bg-[#333333]"></Dates>
        <Dates otherstyles="bg-[#333333]"></Dates>
        <Dates otherstyles="bg-[#333333]"></Dates>
        <Dates otherstyles="bg-[#333333]"></Dates>
      </View>
    </ScrollView>
  );
};

export default DateList;
