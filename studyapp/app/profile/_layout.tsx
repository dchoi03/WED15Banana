import { Stack } from 'expo-router';


export default function ProfileLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index"  options ={{ 
              title: "Profile", 
              headerTintColor: '#007AFF',
              }} />
      <Stack.Screen name="editProfile"  options ={{ 
              title: "Edit Profile", 
              headerTintColor: '#007AFF',
              }}/>
    </Stack>
  );
}