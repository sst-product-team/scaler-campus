import { View, TextInput } from "react-native";
import React, { useState } from "react";

type Props = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles: string;
};

const FromField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`mt-9 ${otherStyles}`}>
      <View className="w-[85%] h-16 px-4 bg-black-100 rounded-2xl border-2 border-[#5F60C3] flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-semibold text-base pb"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={placeholder === "Password" && !showPassword}
        />
      </View>
    </View>
  );
};

export default FromField;
