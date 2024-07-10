import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { GestureResponderEvent } from "react-native";

type Props = {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles: string;
  textStyles: string;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-[#5F60C3] rounded-xl min-h-[62px] flex justify-center items-center mt-10  ${containerStyles}`}
    >
      <Text className={`text-white font-semibold text-xl ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
