import { Stack } from 'expo-router';
import React from 'react';


export default function SearchLayout() {

  return (
    <Stack initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options ={{ 
            title: "Map",
        }}
      />
      <Stack.Screen
        name="searchProfile"
        options ={{ 
            title: "Profile",
        }}
      />
    </Stack>
  );
}
