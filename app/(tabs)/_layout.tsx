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
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SheetProvider } from "react-native-actions-sheet";
import "@/components/sheets";
import LottieView from "lottie-react-native";
import Confetti from "@/assets/animations/confetti.json";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <SheetProvider>
        <>
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
              name="dashboard"
              options={{
                title: "Dashboard",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons
                    name="dashboard"
                    size={24}
                    color={focused ? "white" : "grey"}
                  />
                ),
                tabBarIconStyle: { marginBottom: 0 },
              }}
            />
            <Tabs.Screen
              name="classes"
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
          <FlashMessage position="bottom" />
          <View className="items-center">
            {/* <LottieView
              source={Confetti}
              autoPlay
              style={{
                position: "absolute",
                bottom: 0,
                zIndex: 1,
                width: 350,
                height: 350,
              }}
            ></LottieView> */}
          </View>
        </>
      </SheetProvider>
    </GestureHandlerRootView>
  );
}
