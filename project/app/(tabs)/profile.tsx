import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { User, Settings, History, LogOut, ChevronRight, ShoppingBag, MapPin, Phone, Mail, Globe, Moon, Sun, CircleHelp as HelpCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { AuthRequiredModal } from '@/components/AuthRequiredModal';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // For demo purposes, check if user is logged in
  const isLoggedIn = false; // In a real app this would be a state from authentication context
  
  // Mock user data for demo
  const user = isLoggedIn ? {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Bangalore, India',
    profilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    activeSince: 'May 2023',
    listings: 12,
    purchases: 5,
  } : null;
  
  const handleLoginPress = () => {
    setShowAuthModal(false);
    router.push('/auth/phone');
  };
  
  const renderProfileHeader = () => {
    if (!isLoggedIn) {
      return (
        <View style={styles.loginContainer}>
          <View style={styles.loginIconContainer}>
            <User size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.loginTitle}>Sign in to your account</Text>
          <Text style={styles.loginSubtitle}>Access your listings, purchases, and more</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/auth/phone')}
          >
            <Text style={styles.loginButtonText}>Login / Register</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: user?.profilePic }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: theme.colors.text }]}>
            {user?.name}
          </Text>
          <Text style={styles.profileSubtitle}>
            Active since {user?.activeSince}
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.listings}</Text>
              <Text style={styles.statLabel}>Listings</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.purchases}</Text>
              <Text style={styles.statLabel}>Purchases</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    onPress: () => void,
    rightElement?: React.ReactNode
  ) => {
    return (
      <TouchableOpacity 
        style={[styles.menuItem, { backgroundColor: theme.colors.cardBackground }]} 
        onPress={onPress}
      >
        <View style={styles.menuIconContainer}>
          {icon}
        </View>
        <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
          {title}
        </Text>
        <View style={styles.menuRightElement}>
          {rightElement || <ChevronRight size={20} color={COLORS.gray} />}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
          {isLoggedIn && (
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderProfileHeader()}
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Account
            </Text>
            
            {isLoggedIn ? (
              <>
                {renderMenuItem(
                  <User size={20} color={COLORS.primary} />,
                  'Edit Profile',
                  () => {}
                )}
                {renderMenuItem(
                  <ShoppingBag size={20} color={COLORS.accent} />,
                  'My Listings',
                  () => {}
                )}
                {renderMenuItem(
                  <History size={20} color={COLORS.secondary} />,
                  'Purchase History',
                  () => {}
                )}
                {renderMenuItem(
                  <LogOut size={20} color={COLORS.error} />,
                  'Logout',
                  () => {}
                )}
              </>
            ) : (
              renderMenuItem(
                <User size={20} color={COLORS.primary} />,
                'Login to access account features',
                () => router.push('/auth/phone')
              )
            )}
          </View>
          
          {isLoggedIn && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Personal Information
              </Text>
              
              {renderMenuItem(
                <Phone size={20} color={COLORS.primary} />,
                user?.phone || '',
                () => {},
                <Text style={styles.menuItemValue}>Change</Text>
              )}
              
              {renderMenuItem(
                <Mail size={20} color={COLORS.primary} />,
                user?.email || '',
                () => {},
                <Text style={styles.menuItemValue}>Change</Text>
              )}
              
              {renderMenuItem(
                <MapPin size={20} color={COLORS.primary} />,
                user?.location || '',
                () => {},
                <Text style={styles.menuItemValue}>Change</Text>
              )}
            </View>
          )}
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              App Preferences
            </Text>
            
            {renderMenuItem(
              <Globe size={20} color={COLORS.primary} />,
              'Language',
              () => {},
              <Text style={styles.menuItemValue}>English</Text>
            )}
            
            {renderMenuItem(
              theme.isDark ? 
                <Moon size={20} color={COLORS.primary} /> : 
                <Sun size={20} color={COLORS.primary} />,
              'Dark Mode',
              () => {},
              <Switch
                value={theme.isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: COLORS.gray, true: COLORS.primaryLight }}
                thumbColor={theme.isDark ? COLORS.primary : COLORS.lightGray}
              />
            )}
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Help & Support
            </Text>
            
            {renderMenuItem(
              <HelpCircle size={20} color={COLORS.primary} />,
              'Help Center',
              () => {}
            )}
            
            {renderMenuItem(
              <Mail size={20} color={COLORS.primary} />,
              'Contact Us',
              () => {}
            )}
          </View>
          
          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
      
      <AuthRequiredModal 
        visible={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLoginPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    height: 60,
  },
  headerTitle: {
    ...FONTS.h2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loginContainer: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loginIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight + '30', // 30% opacity
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding,
  },
  loginTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  loginSubtitle: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 1.5,
    paddingHorizontal: SIZES.padding * 2,
  },
  loginButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SIZES.padding,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    ...FONTS.h3,
    marginBottom: SIZES.base / 2,
  },
  profileSubtitle: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: SIZES.padding,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.gray,
    opacity: 0.3,
    marginHorizontal: SIZES.base,
  },
  section: {
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h4,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.base,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    marginBottom: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base * 2,
  },
  menuItemText: {
    ...FONTS.body3,
    flex: 1,
  },
  menuRightElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginRight: SIZES.base,
  },
  versionText: {
    ...FONTS.body5,
    color: COLORS.gray,
    textAlign: 'center',
    marginVertical: SIZES.padding,
  },
});