import { View, Text, TouchableOpacity ,StyleSheet} from "react-native";
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
    <View className="flex-row h-[125] items-center justify-between mt-4">
      <TouchableOpacity
        onPress={() => {
          showPSP(98);
        }}
        className="rounded-xl bg-[#333333] h-[80%] w-[45%] pb-1  "
      >
        <View className="h-[50%] flex-1 justify-center">
          <Text className="text-lg text-white text-center">PSP</Text>
        </View>
        <View className="h-[50%] flex-1 ">
          <Text className="text-4xl text-white text-center">98%</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showAttendance(98);
        }}
        className="rounded-xl bg-[#333333] h-[80%] w-[45%] pb-1"
      >
        <View className="h-[50%] flex-1 justify-center">
          <Text className="text-lg text-white text-center">Attendance</Text>
        </View>
        <View className="h-[50%] flex-1 ">
          <Text className="text-4xl text-white text-center">95%</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15, // equivalent to rounded-xl
    backgroundColor: "#333333",
    height: "80%",
    width: "45%",
    paddingBottom: 1,
  },
  shadow: {
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5, // for Android shadow
  },
});

export default InfoHeader;
