import { BarcodeScanningResult, CameraType, CameraView } from "expo-camera";
import { useState } from "react";
import { Text, View } from "react-native";
import QrBox from "@/assets/images/qrBox.svg";
import { router } from "expo-router";

const photoCam = () => {
  return (
    <View className="flex-1 justify-center">
      <CameraView className="flex-1 items-center" facing="front">
        <View className="bg-black/50 p-4 mt-24 rounded-2xl">
          <Text className="text-white text-base font-semibold ">
            Make sure your face is in the center and the Image is clear
          </Text>
        </View>
      </CameraView>
    </View>
  );
};

export default photoCam;
