/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import BottomTabNavigator from './BottomTabNavigator';
import SoundSettingsScreen from '../screens/settings/SoundSettingsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      {/* <RootDrawerNavigation /> */}
    </NavigationContainer>
  );
}

// const Drawer = createDrawerNavigator();

// function RootDrawerNavigation() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen
//         name='Home'
//         component={RootNavigator}
//       />
//     </Drawer.Navigator>
//   );
// }

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="SoundSettings" component={SoundSettingsScreen} options={{headerTitle: 'Sound settings'}} />
    </Stack.Navigator>
  );
}
