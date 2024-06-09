import { View, Text } from "react-native";
import React from "react";
import DateList from "./DateList";
import ClassList from "./ClassList";

const TimeTable = () => {
  return (
    <View>
      <DateList></DateList>
      <ClassList></ClassList>
    </View>
  );
};

export default TimeTable;
