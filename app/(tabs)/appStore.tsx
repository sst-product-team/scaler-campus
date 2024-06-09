import { Text, TouchableOpacity, View } from "react-native";
import React, { Component, useContext } from "react";
import UserContext from "@/hooks/UserContext";

const AppStore = () => {
  const { userState, toggleUserState } = useContext(UserContext);
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl text-white">
        User is {userState ? "logged in" : "not logged in"}{" "}
      </Text>
      <TouchableOpacity onPress={toggleUserState} className="rounded-xl bg-[#333333] m-7  w-[45%] flex justify-center items-center">
        <Text className="text-white font-medium text-xl p-4">{userState ? "Sign out" : "Sign in"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppStore;
