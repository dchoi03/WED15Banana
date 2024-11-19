import { Stack } from 'expo-router';
import { useColorScheme, View, StyleSheet, Button, Text } from 'react-native';

export default function ProfileLayout() {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  return (
     <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index"  options ={{ 
                title: "Your Profile", 
                headerTintColor: '#007AFF',
                headerTitleAlign: "center",
                }} />
        <Stack.Screen name="editProfile"  options ={{ 
                title: "Edit Profile", 
                headerTintColor: '#007AFF',
                }}/>
         <Stack.Screen name="buddyList"  options ={{ 
                title: "Buddy List", 
                headerTintColor: '#007AFF',
                }}/>     
         <Stack.Screen name="userProfile"  options ={{ 
                title: "UserProfile", 
                headerTintColor: '#007AFF',
                }}/>       
      </Stack>
    </View>
  );
}
const styles = StyleSheet.create({
       container: {
         flex: 1,
       },
       lightContainer: {
         backgroundColor: '#FFFFFF',
       },
       darkContainer: {
         backgroundColor: '#000000',
       },
       toggleContainer: {
         position: 'absolute',
         bottom: 20,
         left: 0,
         right: 0,
         alignItems: 'center',
       },
     });