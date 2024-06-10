import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import UserContext from "@/hooks/UserContext";
import Ripple from "@/assets/images/rippleEffect.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeMessage from "@/components/home/WelcomeMessage";
import TimeTable from "@/components/home/TimeTable";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-center">
          <View className="relative w-full items-end">
            <View className="absolute inset-0">
              <Ripple />
            </View>
            <TouchableOpacity
              className="h-14 w-14 bg-white rounded-full z-10 mt-6 mr-5 flex items-center justify-center"
              onPress={() => {
                /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
                showMessage({
                  message: "Oh ज़रा-ज़रा touch me, touch me, touch me",
                  description: "Oh ज़रा-ज़रा  kiss me, kiss me, kiss me",
                  type: "default",
                  backgroundColor: "#5F60C3", // background color
                  color: "white", // text color
                });
                // SheetManager.show("actionSheet");
              }}
            >
              <Ionicons name="person" size={34} color="black" />
            </TouchableOpacity>
          </View>
          <View className="w-full items-start ml-[60] mt-7">
            <WelcomeMessage></WelcomeMessage>
          </View>
          <View className="w-[86%] mt-8 bg-[#333333] h-24 rounded-3xl"></View>
          <View className="w-[100%]  mt-8">
            <TimeTable></TimeTable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
