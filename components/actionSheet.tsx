import React, { useRef } from "react";
import { GestureResponderEvent, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import CustomButton from "./CustomButton";
import AttendancePopUp from "./home/AttendancePopUp/AttendancePopUp";

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
        marginTop: 10,
      }}
      gestureEnabled={true}
    >
      <AttendancePopUp></AttendancePopUp>
    </ActionSheet>
  );
}

export default actionSheet;
