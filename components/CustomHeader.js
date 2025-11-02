import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Dashboard', icon: 'home', screen: 'Dashboard' },
    { name: 'Manage Accounts', icon: 'people', screen: 'Accounts' },
    { name: 'Duty Management', icon: 'clipboard', screen: 'Duty' },
    { name: 'Generate QR', icon: 'qr-code', screen: 'QR' },
    { name: 'Manage Admins', icon: 'shield-checkmark', screen: 'Admin' },
    {name:    'Reports', icon:'document-text', screen:'Report'},
    { name: 'Admin Profile', icon: 'person', screen: 'Profile' },
    { name: 'Logout', icon: 'log-out', screen: 'Logout' },

  ];

  const handleMenuItemPress = async (screen) => {
    setMenuVisible(false);

    if (screen === 'Logout') {
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('role');

              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginLeft: 15 }}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleMenuItemPress(item.screen)}
                    style={({ pressed, hovered }) => [
                      styles.menuItem,
                      hovered && { backgroundColor: '#f3f4f6' }, // hover color (for web)
                      pressed && { backgroundColor: '#e6f0ff' }, // pressed color (for mobile)
                      item.name === 'Logout' && { borderTopWidth: 1, borderTopColor: '#eee' },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.name === 'Logout' ? 'red' : '#60a5fa'}
                      style={styles.menuIcon}
                    />
                    <Text
                      style={[
                        styles.menuText,
                        item.name === 'Logout' && { color: 'red', fontWeight: 'bold' },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingLeft: 20,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    width: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
