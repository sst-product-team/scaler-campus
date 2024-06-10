import { View, Text } from "react-native";
import React from "react";
import ClassBox from "./ClassBox";
import { ScrollView } from "react-native-gesture-handler";

const ClassList = () => {
  return (
    <ScrollView>
      <View className="flex px-6">
        <Text className="text-xl text-white font-semibold mt-6">
          Time Table
        </Text>
        <ClassBox otherstyles=""></ClassBox>
        <ClassBox otherstyles=" bg-[#5F60C3]"></ClassBox>
        <ClassBox otherstyles=""></ClassBox>
        <ClassBox otherstyles=""></ClassBox>
        <ClassBox otherstyles=""></ClassBox>
      </View>
    </ScrollView>
  );
};

export default ClassList;
