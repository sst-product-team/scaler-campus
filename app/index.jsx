import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FromField from "../components/welcome/FromField";
import Logo from "/Users/rudrachauhan/Developer/scaler-campus/assets/images/singUpImg.svg";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <SafeAreaView className="h-full">
      <GestureHandlerRootView>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View className="flex-1 mt-24 items-center">
            <Text className="text-3xl tracking-widest font-medium text-white">
              SCLAER CAMPUS
            </Text>
            <View className="mt-10">
              <Logo />
            </View>
            <View className="h-[80%] w-full bg-[#202020] mt-14 rounded-3xl flex items-center pb-10">
              <Text className="text-2xl text-white text-left w-full font-semibold mt-7 px-8 ">
                Sign in
              </Text>
              <FromField placeholder="Email Address"></FromField>
              <FromField placeholder="Password"></FromField>
              <CustomButton title="Sign in" handlePress={() => router.push("/dashboard")}></CustomButton>
              <Text className="mt-7 text-white font-bold">
                powered by{" "}
                <Text className="text-[#7D93F3]">The Product Team</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Welcome;
