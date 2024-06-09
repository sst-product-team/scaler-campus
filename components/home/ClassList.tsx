import { View, Text } from 'react-native'
import React from 'react'
import ClassBox from './ClassBox'

const ClassList = () => {
  return (
    <View>
      <Text className="text-xl text-white font-semibold mt-6">Time Table</Text>
      <ClassBox otherstyles=''></ClassBox>
      <ClassBox otherstyles=' bg-[#5F60C3]'></ClassBox>
    </View>
  )
}

export default ClassList