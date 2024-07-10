import { View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Dates from "./Dates";

const DateList = () => {
  const dateArr = [
    { otherstyles: "", title: "12", day: "mon" },
    { otherstyles: "bg-[#333333]", title: "13", day: "tue" },
    { otherstyles: "bg-[#333333]", title: "14", day: "wed" },
    { otherstyles: "bg-[#333333]", title: "15", day: "thu" },
    { otherstyles: "bg-[#333333]", title: "16", day: "fri" },
    { otherstyles: "bg-[#333333]", title: "17", day: "sat" },
  ];

  return (
    <ScrollView horizontal={true}>
      <View className="flex-row pl-4">
        {dateArr.map(
          (item: { otherstyles: string; title: string; day: string }) => {
            return (
              <Dates
              key={item.day}
                otherstyles={item.otherstyles}
                title={item.title}
                day={item.day}
              ></Dates>
            );
          }
        )}
      </View>
    </ScrollView>
  );
};

export default DateList;
