import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
          borderRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="dashboard" size={24} color={focused ? "white" : "grey"} />
          ),
          tabBarIconStyle: { marginBottom: 0 },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="school"
              size={24}
              color={focused ? "white" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appStore"
        options={{
          title: "Hostel",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="house"
              size={22}
              color={focused ? "white" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "white" : "grey"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
