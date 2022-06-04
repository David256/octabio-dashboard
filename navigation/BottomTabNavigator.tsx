import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TerminalScreen from '../screens/TerminalScreen';
import HomeScreen from '../screens/HomeScreen';
import GraphScreen from '../screens/GraphScreen';
import { RootTabParamList, RootTabScreenProps } from '../types';

import LedControl from '../components/LedControl';

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
        tabBarActiveBackgroundColor: "purple",
        tabBarInactiveBackgroundColor: "purple"
      }}>
      <BottomTab.Screen
        name="Terminal"
        component={TerminalScreen} 
        options={({ navigation }: RootTabScreenProps<'Terminal'>) => ({
          /* title: 'Hola', */
          headerTitle: "App Name - Terminal",
          tabBarLabel : "",
          tabBarIcon: ({ color }) => <TabBarIcon name="terminal" color={color} />,
          headerRight: () => (
            <LedControl id={0} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          /* title: '', */
          tabBarLabel : "",
          headerTitle: "App Name",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Graph"
        component={GraphScreen}
        options={{
          /* title: '', */
          tabBarLabel : "",
          headerTitle: "App Name - Graph",
          tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart" color={color} />,
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
