import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Search, Bell, Filter, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { AnimalCategoryCard } from '@/components/AnimalCategoryCard';
import { AuthRequiredModal } from '@/components/AuthRequiredModal';

const animalCategories = [
  {
    id: 'cattle',
    title: 'Cattle',
    image: 'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    types: ['Cow', 'Bull', 'Buffalo']
  },
  {
    id: 'goats',
    title: 'Goats',
    image: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    types: ['Goat']
  },
  {
    id: 'sheep',
    title: 'Sheep',
    image: 'https://images.pexels.com/photos/2180881/pexels-photo-2180881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    types: ['Sheep']
  },
  {
    id: 'pets',
    title: 'Pets',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    types: ['Dog', 'Cat', 'Rabbit']
  },
  {
    id: 'birds',
    title: 'Birds',
    image: 'https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    types: ['Parrot', 'Chicken', 'Duck', 'Pigeon']
  },
  {
    id: 'others',
    title: 'Others',
    image: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    types: ['Horse', 'Pig', 'Other']
  },
];

export default function BuyingScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // For demo purposes, check if user is logged in
  const isLoggedIn = false; // In a real app this would be a state from authentication context
  
  const filteredCategories = searchQuery 
    ? animalCategories.filter(
        category => category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   category.types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : animalCategories;
  
  const handleCategoryPress = (category: typeof animalCategories[0]) => {
    if (isLoggedIn) {
      router.push(`/buying/${category.id}`);
    } else {
      setShowAuthModal(true);
    }
  };
  
  const handleLoginPress = () => {
    setShowAuthModal(false);
    router.push('/auth/phone');
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Buy Animals</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={20} color={COLORS.black} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search animal categories..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Animal Categories</Text>
          <FlatList
            data={filteredCategories}
            renderItem={({ item }) => (
              <AnimalCategoryCard 
                category={item} 
                onPress={() => handleCategoryPress(item)} 
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No categories found</Text>
              </View>
            }
          />
        </View>
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
    color: COLORS.black,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  searchInputContainer: {
    flex: 1,
    height: 46,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base * 1.5,
    marginRight: SIZES.base,
  },
  searchIcon: {
    marginRight: SIZES.base,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    ...FONTS.body4,
    color: COLORS.black,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: SIZES.base * 2,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.darkGray,
  },
});