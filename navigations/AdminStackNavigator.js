// navigations/AdminStackNavigator.js (Simplified)
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';

// Import your screens
import Dashboard from '../admin-screens/Dashboard';
import ManageAccounts from '../admin-screens/ManageAccounts';
import ManageDuty from '../admin-screens/DutyManagement'; 
import GenerateQR from '../admin-screens/GenerateQr';
import AdminProfile from '../admin-screens/AdminProfile';
import ManageAdmins from '../admin-screens/ManageAdmins';
import Report from '../admin-screens/Report';

const Stack = createNativeStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#60a5fa',
        },
        headerTintColor: '#fff',
        headerLeft: () => <CustomHeader />,
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen 
        name="Accounts" 
        component={ManageAccounts}
        options={{ title: 'Manage Accounts' }}
      />
      <Stack.Screen 
        name="Duty" 
        component={ManageDuty}
        options={{ title: 'Duty Management' }}
      />
      <Stack.Screen 
        name="QR" 
        component={GenerateQR}
        options={{ title: 'Generate QR' }}
      />
      <Stack.Screen 
        name="Admin" 
        component={ManageAdmins}
        options={{ title: 'Manage Admins' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={AdminProfile}
        options={{ title: 'Admin Profile' }}
      />
      <Stack.Screen 
        name="Report" 
        component={Report}
        options={{ title: 'Reports' }}
      />
    </Stack.Navigator>
  );
}