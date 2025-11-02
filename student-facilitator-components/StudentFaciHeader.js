import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentFaciHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // New state for logout modal
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Dashboard', icon: 'home', screen: 'SFDashboard' },
    { name: 'QR Check-In', icon: 'qr-code', screen: 'QRCheckIn' },
    { name: 'Self Attendance', icon: 'camera', screen: 'SelfAttendance' },
    { name: 'QR Scanner', icon: 'scan', screen: 'QRScanner' },
    { name: 'My Profile', icon: 'person', screen: 'MyProfile' },
    { name: 'Logout', icon: 'log-out', screen: 'Logout' },
  ];

  const handleMenuItemPress = (screen) => {
    setMenuVisible(false);

    if (screen === 'Logout') {
      setLogoutModalVisible(true); // Show custom logout modal
    } else {
      navigation.navigate(screen);
    }
  };

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginLeft: 15 }}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>

      {/* Main Menu Modal */}
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
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && { backgroundColor: '#e6f0ff' },
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

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setLogoutModalVisible(false)}>
          <View style={styles.logoutOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.logoutModal}>
                <Ionicons name="log-out-outline" size={40} color="red" style={{ marginBottom: 10 }} />
                <Text style={styles.logoutTitle}>Confirm Logout</Text>
                <Text style={styles.logoutMessage}>Are you sure you want to log out?</Text>

                <View style={styles.logoutButtons}>
                  <Pressable
                    onPress={() => setLogoutModalVisible(false)}
                    style={[styles.logoutButton, styles.cancelButton]}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>

                  <Pressable onPress={handleLogout} style={[styles.logoutButton, styles.confirmButton]}>
                    <Text style={styles.confirmButtonText}>Logout</Text>
                  </Pressable>
                </View>
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

  // Logout Modal Styles
  logoutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModal: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '80%', // Responsive width
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  logoutMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  logoutButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#d16b6bff', // Matches CustomHeader
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});