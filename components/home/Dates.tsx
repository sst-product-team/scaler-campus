import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    otherstyles : string;
}
const Dates = ({otherstyles} : Props) => {
  return (
    <View className={`h-[85] w-16 bg-[#5F60C3] rounded-[30px] flex items-center justify-center mr-8 ${otherstyles}`}>
      <Text className='text-2xl text-white font-bold'>12</Text>
      <Text className='text-white'>wed</Text>
    </View>
  )
}

export default Dates