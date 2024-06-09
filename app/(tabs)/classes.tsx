import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InfoHeader from "@/components/classes/InfoHeader";

const Classes = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 ">
        <ScrollView className="w-full px-[6%] mt-[16%]">
          <View>
            <Text className="text-4xl tracking-widest font-medium text-white">Classes</Text>
            <InfoHeader />
            <View className="mt-16">
              <View className="rounded-xl bg-[#333333] h-[70] "></View>
              <View className="rounded-xl mt-8 bg-[#333333] h-[70] "></View>
              <View className="rounded-xl mt-8 bg-[#333333] h-[70] "></View>
              <View className="rounded-xl mt-8 bg-[#333333] h-[70] "></View>
              <View className="rounded-xl mt-8 bg-[#333333] h-[70] "></View>
              <View className="rounded-xl mt-8 bg-[#333333] h-[70] "></View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default Classes;
