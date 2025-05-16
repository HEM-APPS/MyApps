import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface Language {
  id: string;
  name: string;
  flag: string;
}

export default function LanguageScreen() {
  const languages: Language[] = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { id: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { id: 'te', name: 'Telugu', flag: '🇮🇳' },
    { id: 'ml', name: 'Malayalam', flag: '🇮🇳' },
    { id: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { id: 'bn', name: 'Bengali', flag: '🇮🇳' },
    { id: 'mr', name: 'Marathi', flag: '🇮🇳' },
  ];
  
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
  };
  
  const handleContinue = () => {
    // In a real app, we would save the language preference
    // For demo purposes, we'll just navigate to the main app
    router.replace('/(tabs)');
  };
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Language</Text>
        </View>
        
        <View style={styles.content}>
          <Animated.View entering={FadeInUp.duration(500).delay(100)}>
            <Text style={styles.title}>Select Your Language</Text>
            <Text style={styles.subtitle}>You can always change this later</Text>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(300)} style={styles.languageGrid}>
            {languages.map((language, index) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageCard,
                  selectedLanguage === language.id && styles.selectedLanguageCard,
                ]}
                onPress={() => handleLanguageSelect(language.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === language.id && styles.selectedLanguageName,
                ]}>
                  {language.name}
                </Text>
                {selectedLanguage === language.id && (
                  <View style={styles.checkIcon}>
                    <Check size={16} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.bottomContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
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
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  languageCard: {
    width: '48%',
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  selectedLanguageCard: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: SIZES.base,
  },
  languageName: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  selectedLanguageName: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  buttonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});