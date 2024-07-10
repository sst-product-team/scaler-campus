import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { Octicons } from "@expo/vector-icons";
import { Motion } from "@legendapp/motion";
import LottieView from "lottie-react-native";
import Confetti from "@/assets/animations/confetti.json";

const ConfirmPage = () => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => (prevValue === 0 ? 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const actions = [
    "Verifying your location",
    "Verifying your face",
    "Verifying your device",
    "Marking attendance for class",
    "Attendance Marked Successfully",
  ];

  type actionProps = {
    action: string;
    index: Number;
  };

  const [show, setShow] = useState(true);

  function toggleShowState() {
    setTimeout(() => {
      setShow((prevValue) => !prevValue);
    }, 1000);
  }

  return (
    <View>
      <Spinner
        visible={true}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
        overlayColor="rgba(0, 0, 0, 0.75)"
      >
        <View className="flex h-full justify-center items-center">
          <View className="items-start">
            {actions.map((action, index) => {
              const [color, setColor] = useState("white");
              setTimeout(() => {
                setColor("#84cc15");
              }, (index + 1) * 1000);
              return (
                <View key={index} className="flex-row items-center gap-2 mb-4">
                  <Octicons name="check-circle" size={18} color={color} />
                  <Text className="text-base" style={{ color: color }}>
                    {action}
                  </Text>
                </View>
              );
            })}
          </View>
          {show && (
            <LottieView
              source={Confetti}
              autoPlay
              loop = {false}
              style={{
                position: "absolute",
                bottom: 0,
                zIndex: 1,
                width: 500,
                height: 500,
              }}
            ></LottieView>
          )}
        </View>
      </Spinner>
    </View>
  );
};

export default ConfirmPage;
