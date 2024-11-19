import { Tabs } from "expo-router";
import React from "react";

import Feather from "@expo/vector-icons/Feather";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Users, Search } from "lucide-react-native";
import Toast from "react-native-toast-message";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Matcher",
            tabBarIcon: ({ color, focused }) => <Users color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <Search size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sessions"
          options={{
            title: "Sessions",
            tabBarIcon: ({ color, size }) => (
              <Feather name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
