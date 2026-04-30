import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Theme';

import { WelcomeScreen } from '../screens/WelcomeScreen';
import { CoupleLinkScreen } from '../screens/CoupleLinkScreen';
import { DateWizardScreen } from '../screens/DateWizardScreen';
import { GameModeScreen } from '../screens/GameModeScreen';
import { QuestionsScreen } from '../screens/QuestionsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any;
        if (route.name === 'DateDecider') iconName = focused ? 'heart' : 'heart-outline';
        else if (route.name === 'GameMode') iconName = focused ? 'game-controller' : 'game-controller-outline';
        else if (route.name === 'Questions') iconName = focused ? 'chatbubble' : 'chatbubble-outline';
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary[500],
      tabBarInactiveTintColor: Colors.secondary[400],
      tabBarStyle: { height: 60, paddingBottom: 8 },
      headerShown: false,
    })}
  >
    <Tab.Screen name="DateDecider" component={DateWizardScreen} options={{ title: 'Date' }} />
    <Tab.Screen name="GameMode" component={GameModeScreen} options={{ title: 'Games' }} />
    <Tab.Screen name="Questions" component={QuestionsScreen} options={{ title: 'Discover' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="CoupleLink" component={CoupleLinkScreen} />
    <Stack.Screen name="MainApp" component={MainTabs} />
  </Stack.Navigator>
);
