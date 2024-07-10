import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  CameraViewRef,
} from "expo-camera";
import { useState, useRef } from "react"; // Import useRef from react
import { Text, TouchableOpacity, View } from "react-native";
import QrBox from "@/assets/images/qrBox.svg";
import { router } from "expo-router";

const qrScanner = () => {
  const [camera, setCamera] = useState<CameraView | null>(null);
  const cameraRef = useRef<CameraViewRef>(null); // Provide the correct type for cameraRef

  async function takePicture() {
    if (camera) {
      const options = { quality: 1, base64: true, exif: true };
      const picture = await camera.takePictureAsync(options);
    }
    router.replace("/dashboard");
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView
        className="flex-1 items-center justify-between"
        facing="front"
        ref={(ref) => setCamera(ref)}
      >
        <View className="mt-20 bg-black/50 p-4 rounded-2xl">
          <Text className="text-white text-lg font-semibold ">
            Take a clear photo of your face
          </Text>
        </View>
        <TouchableOpacity
          className="h-20 w-20 rounded-full bg-white mb-20"
          onPress={takePicture}
        ></TouchableOpacity>
      </CameraView>
    </View>
  );
};

export default qrScanner;
