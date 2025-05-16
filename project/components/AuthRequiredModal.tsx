import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react-native';

interface AuthRequiredModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AuthRequiredModal({ visible, onClose, onLogin }: AuthRequiredModalProps) {
  const { theme } = useTheme();
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/7730530/pexels-photo-7730530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
            style={styles.image} 
          />
          
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Login Required
          </Text>
          
          <Text style={styles.message}>
            Please login or register to access this feature. Create an account to buy and sell animals easily.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={onLogin}
            >
              <Text style={styles.loginButtonText}>
                Login / Register
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  modalContainer: {
    width: '100%',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: SIZES.base,
    right: SIZES.base,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    marginBottom: SIZES.base,
  },
  message: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 1.5,
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 1.5,
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  loginButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 1.5,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...FONTS.h4,
    color: COLORS.darkGray,
  },
});