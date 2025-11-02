import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// 🚨 IMPORTANT: Import the screens that will live inside the tabs.
// We assume these are located in '../admin-screens/'
import Dashboard from '../admin-screens/Dashboard';
import ManageAccounts from '../admin-screens/ManageAccounts';
import ManageDuty from '../admin-screens/DutyManagement'; 
import GenerateQR from '../admin-screens/GenerateQr';
import AdminProfile from '../admin-screens/AdminProfile';
import ManageAdmins from '../admin-screens/ManageAdmins';
import Report from '../admin-screens/Report';

const Tab = createBottomTabNavigator();

// NOTE: We REMOVED the line that imported this file into itself, fixing the cycle warning.

export default function AdminBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#60a5fa', // Blue
        tabBarInactiveTintColor: '#6b7280', // Gray
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
  let iconName;
  if (route.name === 'Dashboard') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Accounts') {
    iconName = focused ? 'people' : 'people-outline';
  } else if (route.name === 'Duty') {
    iconName = focused ? 'clipboard' : 'clipboard-outline';
  } else if (route.name === 'QR') {
    iconName = focused ? 'qr-code' : 'qr-code-outline';
  } else if (route.name === 'Admin') {
    iconName = focused ? 'shield-checkmark' : 'shield-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === 'Report') {
    iconName = focused ? 'document-text' : 'document-text-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
},
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Accounts" component={ManageAccounts} />
      <Tab.Screen name="Duty" component={ManageDuty} />
      <Tab.Screen name="QR" component={GenerateQR} />
      <Tab.Screen name="Admin" component={ManageAdmins} />
      <Tab.Screen name="Profile" component={AdminProfile} />
      <Tab.Screen name="Report" component={Report} />
    </Tab.Navigator>
  );
}
