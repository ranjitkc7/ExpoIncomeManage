import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import "../../global.css";

const IncomePage = () => {
  const [income, setIncome] = useState(0);
  const [showIncome, setShowIncome] = useState(0);
  const handleshowIncome = () => {
    setShowIncome(income);
    setIncome(0);
  };
  return (
    <View className="flex-1 items-center justify-start p-[10px]">
      <View className="flex flex-row items-center">
        <TextInput
          value={income}
          onChangeText={(text) => setIncome(text)}
          keyboardType="numeric"
          className="w-[180px] h-[40px] border border-gray-300 rounded-md p-2"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        />
        <TouchableOpacity
          disabled={income === 0}
          activeOpacity={0.7}
          onPress={handleshowIncome}
          className="w-[6rem] h-[40px] rounded-md bg-blue-400
        items-center justify-center ml-[10px]"
        >
          <Text className="text-white text-[1.4rem] font-[800]">ADD</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-[3rem] font-[700]">{showIncome}</Text>
    </View>
  );
};

export default IncomePage;
