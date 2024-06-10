import React, { useRef } from "react";
import { GestureResponderEvent, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import CustomButton from "./CustomButton";

type Props = {
  sheetId: string;
  payload: string;
};

function actionSheet({ sheetId, payload }: Props) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#333333",
      }}
      indicatorStyle={{
        backgroundColor: "#605E5E",
        width: 100,
      }}
      gestureEnabled={true}
    >
      <View className="items-center">
        <View
          style={{
            padding: 20,
            height: 200,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#605E5E",
              borderRadius: 100,
              marginRight: 10,
            }}
          />

          <View style={{ flexGrow: 1 }}>
            <View
              style={{
                width: "100%",
                height: 20,
                backgroundColor: "#605E5E",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                width: "80%",
                height: 20,
                backgroundColor: "#605E5E",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View className="p-[20]">
          <CustomButton
            title="Mark Attendance"
            handlePress={() => {}}
            containerStyles={""}
            textStyles={"px-4 text-lg"}
          ></CustomButton>
        </View>
      </View>
    </ActionSheet>
  );
}

export default actionSheet;
