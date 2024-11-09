import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import profile from './(tabs)/profile'
import editProfile from './editProfile';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProfilePage">
        <Stack.Screen name="ProfilePage" component={profile} />
        <Stack.Screen name="EditProfile" component={editProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;