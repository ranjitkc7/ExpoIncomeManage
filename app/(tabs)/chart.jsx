import { View, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { useLocalSearchParams } from "expo-router";

const ChartPage = () => {
  const { allExpense } = useLocalSearchParams();
  const parsedExpenses = allExpense ? JSON.parse(allExpense) : [];

  const categoryColors = {
    Shopping: "#FF6384",
    Rent: "#36A2EB",
    Groceries: "#FFCE56",
    Transportation: "#4BC0C0",
    Entertainment: "#9966FF",
    Miscellaneous: "#FF9F40",
    Other: "#C9CBCF",
  };

  // Create a copy of the expenses and sort it in descending order of amount
  const sortedExpenses = [...parsedExpenses].sort(
    (a, b) => b.amount - a.amount
  );

  // Prepare chart data
  const chartData = sortedExpenses.map((expense) => ({
    name: expense.type,
    value: expense.amount,
    color: categoryColors[expense.type] || "#AAAAAA", // Fallback color if type is not found
    legendFontColor: "#000",
    legendFontSize: 15,
  }));

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-[1.5rem] font-bold text-center mb-4">
        Expense Breakdown
      </Text>
      <PieChart
        data={chartData}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={{ backgroundColor: "white", color: () => `black` }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="10"
      />
      <Text className="text-lg font-semibold mt-6 mb-2">Expense Details:</Text>
      <FlatList
        data={sortedExpenses}
        keyExtractor={(item) => item.id} // Use unique ID as the key for FlatList
        renderItem={({ item }) => (
          <View className="flex-row justify-between border-b border-gray-200 py-2">
            <Text className="text-base">{item.type}</Text>
            <Text className="text-base font-bold">${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChartPage;
