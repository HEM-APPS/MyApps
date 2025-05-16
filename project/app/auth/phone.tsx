import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function PhoneScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handlePhoneChange = (text: string) => {
    // Remove any non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleaned);
    
    // Basic validation - phone number should be at least 10 digits
    setIsValid(cleaned.length >= 10);
  };

  const handleContinue = () => {
    if (isValid) {
      // In a real app, we would send the OTP to this number
      // For demo, we'll just navigate to the verify screen
      router.push({
        pathname: '/auth/verify',
        params: { phone: phoneNumber }
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Animated.View entering={FadeInUp.duration(500).delay(100)}>
            <Text style={styles.title}>Enter your phone number</Text>
            <Text style={styles.subtitle}>We'll send you a verification code</Text>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(300)} style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="10 digit mobile number"
                placeholderTextColor={COLORS.gray}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                maxLength={10}
              />
            </View>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.bottomContainer}>
            <TouchableOpacity 
              style={[styles.button, !isValid && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    marginBottom: SIZES.padding * 2,
  },
  inputContainer: {
    marginBottom: SIZES.padding * 2,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: SIZES.base,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SIZES.base * 2,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.gray,
  },
  countryCodeText: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: SIZES.base * 2,
    ...FONTS.body3,
    color: COLORS.black,
  },
  bottomContainer: {
    marginTop: 'auto',
    marginBottom: SIZES.padding * 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  termsText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
});