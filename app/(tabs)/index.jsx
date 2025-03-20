import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import "../../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const IncomePage = () => {
  const [income, setIncome] = useState(0);
  const [showIncome, setShowIncome] = useState(0);
  const [selected, setSelected] = useState(null);
  const [expense, setExpense] = useState(0);
  const [allExpense, setAllExpense] = useState([]);

  const data = [
    { id: 1, name: "Shopping" },
    { id: 2, name: "Rent" },
    { id: 3, name: "Groceries" },
    { id: 4, name: "Transportation" },
    { id: 5, name: "Entertainment" },
    { id: 6, name: "Miscellaneous" },
    { id: 7, name: "Other" },
  ];

  const router = useRouter();

  // Handle showing income
  const handleshowIncome = () => {
    setShowIncome(income);
    setIncome(0);
  };

  // Handle expense submission
  const handleExpense = () => {
    if (!selected) {
      Alert.alert("Please select a category");
      return;
    }

    // Find the category name for the selected expense type
    const expenseType =
      data.find((item) => item.id === selected)?.name || "Others";

    const newExpense = showIncome - expense;
    if (newExpense < 0) {
      Alert.alert("Not enough income to cover the expense.");
      return;
    }

    // Create a new expense object
    const newAllExpense = [
      ...allExpense,
      {
        type: expenseType,
        amount: expense,
        total: income,
        date: new Date(),
        id: expenseType + Date.now(),
      },
    ];

    // Update the expenses and income
    setAllExpense(newAllExpense);
    setShowIncome(newExpense);
    setExpense(0);
    setSelected(null);

    // If income reaches 0, show a toast message
    if (newExpense === 0) {
      ToastAndroid.show("Your total income is now 0", ToastAndroid.LONG);
    }

    // Navigate to the chart page and pass the updated expenses
    router.push({
      pathname: "/chart",
      params: { allExpense: JSON.stringify(newAllExpense) },
    });
  };

  // Save expense to AsyncStorage
  const saveExpense = async () => {
    try {
      await AsyncStorage.setItem("allExpense", JSON.stringify(allExpense));
    } catch (error) {
      console.log("Error saving expense:", error);
    }
  };

  // Load expense from AsyncStorage
  const loadExpense = async () => {
    try {
      const storedExpense = await AsyncStorage.getItem("allExpense");
      if (storedExpense) {
        setAllExpense(JSON.parse(storedExpense));
      }
    } catch (error) {
      console.log("Error loading expense:", error);
    }
  };

  useEffect(() => {
    loadExpense();
  }, []);

  useEffect(() => {
    saveExpense();
  }, [allExpense]);

  return (
    <View className="flex-1 items-center justify-start p-[10px]">
      <View className="flex flex-row items-center">
        <TextInput
          value={income}
          onChangeText={(text) => setIncome(text)}
          keyboardType="numeric"
          className="w-[180px] h-[40px] border bg-white border-gray-300 rounded-md p-[10px] placeholder:text-[15px]"
        />
        <TouchableOpacity
          disabled={income === 0}
          activeOpacity={0.7}
          onPress={handleshowIncome}
          className="w-[6rem] h-[40px] rounded-md bg-blue-400 items-center justify-center ml-[10px]"
        >
          <Text className="text-white text-[1.4rem] font-[800]">ADD</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-[3rem] font-[700]">{showIncome}</Text>

      <View className="h-[24.5rem] w-full bg-pink-100 p-[12px] gap-2">
        <Text className="text-[1.2rem] font-[700] text-center">
          Choose the purpose:
        </Text>

        {data.map((item) => {
          const isSelected = selected === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              className={`flex-row h-[2.5rem] w-full gap-4 rounded-md px-[10px] py-[7px] 
                ${isSelected ? "bg-blue-300" : "bg-white"}`}
              activeOpacity={0.7}
              onPress={() => setSelected(isSelected ? null : item.id)}
            >
              <View
                className={`h-[20px] w-[20px] rounded-full border border-black flex items-center justify-center`}
              >
                {isSelected && (
                  <View className="h-[12px] w-[12px] bg-black rounded-full"></View>
                )}
              </View>
              <Text className="text-[1.1rem]">{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        className="w-[100%] mt-[10px] h-[45px] border border-gray-300 
        rounded-md px-3 bg-white placeholder:text-[15px]"
        keyboardType="numeric"
        value={expense}
        onChangeText={(text) => setExpense(text)}
        placeholder="Enter the expense Amount"
      />

      <TouchableOpacity
        disabled={expense === 0}
        onPress={handleExpense}
        activeOpacity={0.7}
        className="w-[100%] h-[35px] bg-blue-400 items-center justify-center rounded-md mt-[10px]"
      >
        <Text className="text-white text-[1.2rem] font-[700]">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IncomePage;
