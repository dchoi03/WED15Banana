import React, { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  return (
    <GluestackUIProvider mode="light">
      <Stack initialRouteName="login">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}