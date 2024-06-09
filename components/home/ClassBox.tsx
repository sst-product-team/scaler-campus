import { View, Text } from "react-native";
import React from "react";

type Props = {
    otherstyles : string;
}

const ClassBox = ({otherstyles} : Props) => {
  return (
    <View className={`mt-6 bg-[#333333] rounded-2xl ${otherstyles}`}>
      <View className="p-3">
        <Text className="text-white tracking-widest text-base font-medium">DSA-4</Text>
        <Text className="text-white text-right text-xs">09:00 AM - 11:30 AM</Text>
      </View>
    </View>
  );
};

export default ClassBox;
