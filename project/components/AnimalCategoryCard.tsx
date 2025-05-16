import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface AnimalCategoryCardProps {
  category: {
    id: string;
    title: string;
    image: string;
    types: string[];
  };
  onPress: () => void;
}

export function AnimalCategoryCard({ category, onPress }: AnimalCategoryCardProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.cardBackground }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: category.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {category.title}
          </Text>
          <Text style={styles.subtitle}>
            {category.types.join(' • ')}
          </Text>
        </View>
        
        <View style={styles.arrowContainer}>
          <ChevronRight size={20} color={COLORS.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
  },
  title: {
    ...FONTS.h3,
    marginBottom: SIZES.base / 2,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});