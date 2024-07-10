import { View, Text } from "react-native";
import React from "react";
import ClassBox from "./ClassBox";
import { ScrollView } from "react-native-gesture-handler";

const ClassList = () => {
  const classArr = [
    {
      name: "SQL Transactions I",
      time: "09:00 - 11:30",
      status: "ended",
    },
    {
      name: "DP Advance II",
      time: "12:00 - 14:30",
      status: "active",
    },
    {
      name: "DSA Lab III",
      time: "15:00 - 17:00",
      status: "upcomming",
    },
  ];

  return (
    <ScrollView>
      <View className="flex px-6 pb-4">
        <Text className="text-xl text-white font-semibold mt-6">
          Time Table
        </Text>
        {classArr.map(
          (item: { name: string; time: string; status: string }) => {
            return (
              <ClassBox
              key={item.name}
                title={item.name}
                status={item.status}
                otherstyles={""}
              ></ClassBox>
            );
          }
        )}
      </View>
    </ScrollView>
  );
};

export default ClassList;
