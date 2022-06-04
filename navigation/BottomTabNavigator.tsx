import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TerminalScreen from '../screens/TerminalScreen';
import HomeScreen from '../screens/HomeScreen';
import GraphScreen from '../screens/GraphScreen';
import { RootTabParamList, RootTabScreenProps } from '../types';

import LedControls from '../components/LedControls';
import Strings from '../constants/Strings';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarActiveBackgroundColor: Colors.tabBar.active,
        tabBarInactiveBackgroundColor: Colors.tabBar.inactive,
      }}>
      <BottomTab.Screen
        name="Terminal"
        component={TerminalScreen} 
        options={({ navigation }: RootTabScreenProps<'Terminal'>) => ({
          /* title: 'Hola', */
          headerTitle: `${Strings.appName} - Terminal`,
          tabBarLabel : "",
          tabBarIcon: ({ color }) => <TabBarIcon name="terminal" color={color} />,
          headerRight: () => <LedControls />,
        })}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          /* title: '', */
          tabBarLabel : "",
          headerTitle: `${Strings.appName}`,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => <LedControls />,
        }}
      />
      <BottomTab.Screen
        name="Graph"
        component={GraphScreen}
        options={{
          /* title: '', */
          tabBarLabel : "",
          headerTitle: `${Strings.appName} - Graph`,
          tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart" color={color} />,
          headerRight: () => <LedControls />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
* You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
*/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
