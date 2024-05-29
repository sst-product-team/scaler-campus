import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MessageType, showMessage } from "react-native-flash-message";

const InfoHeader = () => {
  const showAttendance = (percenatge: number) => {
    var mtype: MessageType = "success";
    if (percenatge < 85) {
      mtype = "danger";
    }
    showMessage({
      message: "Attendance Percentage",
      description: `Your attendance percentage is ${percenatge}`,
      type: mtype,
    });
  };
  const showPSP = (psp: number) => {
    var mtype: MessageType = "success";
    if (psp < 80) {
      mtype = "danger";
    }
    showMessage({
      message: "PSP Percentage",
      description: `Your psp percentage is ${psp}`,
      type: mtype,
    });
  };

  return (
    <View className="flex-row h-[150] items-center justify-between mt-4">
      <TouchableOpacity
        onPress={() => {
          showPSP(98);
        }}
        className="rounded-xl bg-[#333333] h-[80%] w-[45%]"
      >
        <View className="h-[50%] flex-1 justify-center">
          <Text className="text-xl text-gray-300 text-center">PSP</Text>
        </View>
        <View className="h-[50%] flex-1 ">
          <Text className="text-4xl text-gray-300 text-center">98%</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showAttendance(98);
        }}
        className="rounded-xl bg-[#333333] h-[80%] w-[45%]"
      >
        <View className="h-[50%] flex-1 justify-center">
          <Text className="text-xl text-gray-300 text-center">Attendance</Text>
        </View>
        <View className="h-[50%] flex-1 ">
          <Text className="text-4xl text-gray-300 text-center">98%</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InfoHeader;
