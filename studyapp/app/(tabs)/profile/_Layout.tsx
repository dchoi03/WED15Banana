import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import profile from './profile'
import editProfile from './editProfile';

const Stack = createStackNavigator();

export const profilePageStacker = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProfilePage">
        <Stack.Screen name="ProfilePage" component={profile} />
        <Stack.Screen name="EditProfile" component={editProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

