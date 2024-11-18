import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
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
  );
}