import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import WelcomeMessage from "@/components/home/WelcomeMessage";

const index = () => {
  return (
    
     <View className="flex-1 justify-center items-center">
     <Text className="text-2xl text-white">Explore</Text>
   </View>
  );
};

export default index;
