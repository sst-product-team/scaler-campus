import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import UserContext from "@/hooks/UserContext";
import Ripple from "@/assets/images/rippleEffect.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeMessage from "@/components/home/WelcomeMessage";
import TimeTable from "@/components/home/TimeTable";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <View className="items-center">
        <View className="relative w-full items-end">
          <View className="absolute inset-0">
            <Ripple />
          </View>
          <View className="h-14 w-14 bg-white rounded-full z-10 mt-6 mr-5"></View>
        </View>
        <View className="w-full items-start ml-[60] mt-7">
          <WelcomeMessage></WelcomeMessage>
        </View>
        <View className="w-[86%] mt-8 bg-[#333333] h-24 rounded-3xl"></View>
        <View className="w-[86%] mt-8">
          <TimeTable></TimeTable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
