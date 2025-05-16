import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.email.includes('@') && 
           formData.location.trim() !== '';
  };
  
  const handleRegister = () => {
    if (isFormValid()) {
      // In a real app, we would send this data to an API
      // For demo, we'll navigate to the language selection
      router.push('/auth/language');
    }
  };
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInUp.duration(500).delay(100)}>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>Tell us a bit about yourself</Text>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(300)} style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.gray}
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your city, state"
                placeholderTextColor={COLORS.gray}
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
            </View>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, !isFormValid() && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={!isFormValid()}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
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
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginLeft: SIZES.padding,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding * 3,
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
  formContainer: {
    marginBottom: SIZES.padding * 2,
  },
  inputGroup: {
    marginBottom: SIZES.padding,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: SIZES.base,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base * 2,
    ...FONTS.body3,
    color: COLORS.black,
  },
  buttonContainer: {
    marginTop: SIZES.padding,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});