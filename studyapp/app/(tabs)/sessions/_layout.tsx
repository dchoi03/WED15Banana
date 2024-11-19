import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function SessionsLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light"><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options ={{ 
              title: "Study Sessions", 
              headerTintColor: '#007AFF',
              }}
          />
          <Stack.Screen
            name="create"
            options={{
              headerTitle: 'Create New Session', // Hide title on the new page
              headerBackTitleVisible: false, // Hide back button text (iOS only)
              headerTintColor: '#007AFF',
              }}
          />
          <Stack.Screen
            name="details"
            options={{
              title: "Session Details", 
              headerBackTitleVisible: false, // Hide back button text (iOS only)
              headerTintColor: '#007AFF',
            }}
          />
        </Stack>
      </ThemeProvider></GluestackUIProvider>
  );
}
