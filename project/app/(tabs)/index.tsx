import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { AnimalListingCard } from '@/components/AnimalListingCard';
import { getAnimalListings } from '@/data/animalListings';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'cattle', name: 'Cattle' },
  { id: 'goats', name: 'Goats' },
  { id: 'sheep', name: 'Sheep' },
  { id: 'pets', name: 'Pets' },
  { id: 'birds', name: 'Birds' },
  { id: 'horses', name: 'Horses' },
  { id: 'pigs', name: 'Pigs' },
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const animalListings = getAnimalListings();
  
  const filteredListings = animalListings.filter(listing => {
    if (selectedCategory !== 'all' && listing.category !== selectedCategory) {
      return false;
    }
    
    if (searchQuery) {
      return listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
             listing.breed.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });
  
  const renderCategoryItem = ({ item, index }: { item: typeof categories[0], index: number }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <Animated.View entering={FadeInRight.delay(index * 100)}>
        <TouchableOpacity
          style={[
            styles.categoryItem,
            isSelected && { backgroundColor: COLORS.primary }
          ]}
          onPress={() => setSelectedCategory(item.id)}
        >
          <Text style={[
            styles.categoryText,
            isSelected && { color: COLORS.white }
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={18} color={COLORS.primary} />
            <Text style={styles.location}>Bangalore, India</Text>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for animals..."
                placeholderTextColor={COLORS.gray}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View>
          <FlatList
            data={categories}
            horizontal
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <FlatList
          data={filteredListings}
          renderItem={({ item }) => <AnimalListingCard listing={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listingsContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>Popular Listings</Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No animals found</Text>
              <Text style={styles.emptySubtext}>Try a different category or search term</Text>
            </View>
          }
        />
      </SafeAreaView>
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
    paddingTop: SIZES.base,
    paddingBottom: SIZES.base,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  location: {
    ...FONTS.body4,
    color: COLORS.black,
    marginLeft: SIZES.base,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  categoriesList: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
  },
  categoryItem: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius * 3,
    backgroundColor: COLORS.lightGray,
    marginRight: SIZES.base,
  },
  categoryText: {
    ...FONTS.body4,
    ...FONTS.medium,
    color: COLORS.darkGray,
  },
  listingsContainer: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingBottom: 100,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: SIZES.padding,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  emptyText: {
    ...FONTS.h3,
    color: COLORS.darkGray,
    marginBottom: SIZES.base,
  },
  emptySubtext: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
});