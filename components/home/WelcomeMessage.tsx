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
      <Text className="text-white text-xl">Good {getMessage()}</Text>
      <Text className="text-white text-4xl mt-3 font-medium tracking-widest">Rudra</Text>
    </View>
  );
};

export default WelcomeMessage;
