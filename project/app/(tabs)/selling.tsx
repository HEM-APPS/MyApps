import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Camera, Image as ImageIcon, CircleAlert as AlertCircle, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { AuthRequiredModal } from '@/components/AuthRequiredModal';

interface CategoryItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  subCategories: string[];
}

export default function SellingScreen() {
  const { theme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // For demo purposes, check if user is logged in
  const isLoggedIn = false; // In a real app this would be a state from authentication context
  
  const categories: CategoryItem[] = [
    {
      id: 'cattle',
      title: 'Cattle',
      icon: <Image source={{ uri: 'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.categoryIcon} />,
      subCategories: ['Cow/Bull', 'Buffalo']
    },
    {
      id: 'small_livestock',
      title: 'Small Livestock',
      icon: <Image source={{ uri: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.categoryIcon} />,
      subCategories: ['Goat', 'Sheep', 'Pig']
    },
    {
      id: 'pets',
      title: 'Pets',
      icon: <Image source={{ uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.categoryIcon} />,
      subCategories: ['Dog', 'Cat', 'Rabbit', 'Fish']
    },
    {
      id: 'birds',
      title: 'Birds',
      icon: <Image source={{ uri: 'https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.categoryIcon} />,
      subCategories: ['Parrot', 'Rooster', 'Country Chicken', 'Duck', 'Pigeon']
    },
    {
      id: 'others',
      title: 'Others',
      icon: <Image source={{ uri: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.categoryIcon} />,
      subCategories: ['Horse', 'Other']
    },
  ];
  
  const handleCategoryPress = (category: CategoryItem) => {
    if (isLoggedIn) {
      router.push(`/selling/${category.id}`);
    } else {
      setShowAuthModal(true);
    }
  };
  
  const handleLoginPress = () => {
    setShowAuthModal(false);
    router.push('/auth/phone');
  };
  
  const renderCategoryItem = (category: CategoryItem) => {
    return (
      <TouchableOpacity
        key={category.id}
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(category)}
        activeOpacity={0.8}
      >
        <View style={styles.categoryIconContainer}>
          {category.icon}
        </View>
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categorySubtitle}>
            {category.subCategories.slice(0, 3).join(', ')}
            {category.subCategories.length > 3 ? ' & more' : ''}
          </Text>
        </View>
        <ArrowRight size={20} color={COLORS.gray} />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sell Your Animals</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <AlertCircle size={24} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>How to sell?</Text>
              <Text style={styles.infoText}>Select a category, add photos, details, and post your animal for sale. Buyers will contact you directly.</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Select Animal Category</Text>
          
          <View style={styles.categoriesContainer}>
            {categories.map(renderCategoryItem)}
          </View>
          
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for successful selling:</Text>
            <View style={styles.tipItem}>
              <View style={styles.tipIconContainer}>
                <Camera size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.tipText}>Add clear photos from different angles</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIconContainer}>
                <ImageIcon size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.tipText}>Include a short video if possible</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIconContainer}>
                <AlertCircle size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.tipText}>Be accurate with details like age, weight, breed</Text>
            </View>
          </View>
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
    paddingHorizontal: SIZES.padding,
    height: 60,
    justifyContent: 'center',
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryLight + '30', // 30% opacity
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base * 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.base / 2,
  },
  infoText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base * 2,
  },
  categoriesContainer: {
    marginBottom: SIZES.padding,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.base * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginRight: SIZES.base * 2,
  },
  categoryIcon: {
    width: '100%',
    height: '100%',
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.base / 2,
  },
  categorySubtitle: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  tipsContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  tipsTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.base * 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base * 1.5,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base * 1.5,
  },
  tipText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    flex: 1,
  },
});