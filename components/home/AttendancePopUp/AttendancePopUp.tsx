import { View, Text, Button } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import ClassTag from "./ClassTag";
import CourseTag from "./CourseTag";
import { router } from "expo-router";
import { useCameraPermissions } from "expo-camera";

const AttendancePopUp = () => {
  const [permission, requestPermission] = useCameraPermissions();
  function handleMarkAttendance() {
    if (!permission?.granted) {
      requestPermission;
    }
    router.navigate("/qrScanner");
  }

  return (
    <View className="items-center mb-5 mt-8">
      <View className="items-start w-[85%] ">
        <ClassTag></ClassTag>
        <Text className="text-white text-2xl max-w-xs tracking-widest font-medium my-2">
          Binary Tree Interview Problems
        </Text>
        <View className="flex-row justify-between w-full">
          <CourseTag></CourseTag>
          <Text className="text-white text-right text-sm">
            09:00 AM - 11:30 AM
          </Text>
        </View>
      </View>
      <CustomButton
        title="Mark Attendance"
        handlePress={() => handleMarkAttendance()}
        containerStyles={"rounded-2xl"}
        textStyles={"px-12 text-base font-normal "}
      ></CustomButton>
      <Text className="text-[#959595] my-4">
        Having Trouble? Report a problem
      </Text>
    </View>
  );
};

export default AttendancePopUp;
