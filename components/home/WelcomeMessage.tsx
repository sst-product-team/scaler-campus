import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { HelloWave } from "../HelloWave";

function getMessage(): string {
  const currentDate = new Date();
  const time = currentDate.getHours();
  if (time >= 4 && time < 12) {
    return "Morning";
  } else if (time >= 12 && time < 17) {
    return "Afternoon";
  } else if (time >= 17 && time < 20) {
    return "Evening";
  } else {
    return "Night";
  }
}

const WelcomeMessage = () => {
  return (
    <View>
      <Text className="text-xl text-white">Good {getMessage()}</Text>
      <Text className="text-3xl font-semibold tracking-widest text-white py-1">
        Rudra Chauhan
      </Text>
      <Text className="text-xl text-white">10137</Text>
    </View>
  );
};

export default WelcomeMessage;
