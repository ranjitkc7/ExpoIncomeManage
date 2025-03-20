import React from 'react';
import { Tabs } from 'expo-router';
import '../../global.css';
import { Foundation, FontAwesome } from "@expo/vector-icons";

const LayoutPage = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#fce7f3",
        },
        tabBarActiveTintColor: "#4361ee",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Foundation name="record" size={30} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: "Data Chart",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="pie-chart" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

export default LayoutPage;