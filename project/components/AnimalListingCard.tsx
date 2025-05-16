import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { MapPin, Star } from 'lucide-react-native';
import { AnimalListing } from '@/data/animalListings';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

interface AnimalListingCardProps {
  listing: AnimalListing;
}

export function AnimalListingCard({ listing }: AnimalListingCardProps) {
  const { theme } = useTheme();
  
  const handlePress = () => {
    // In a real app, we would navigate to the listing detail screen
    // router.push(`/listing/${listing.id}`);
    alert(`Viewing details for: ${listing.title}`);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.cardBackground }
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: listing.image }} style={styles.image} />
        {listing.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {listing.title}
        </Text>
        
        <Text style={styles.price}>
          {formatPrice(listing.price)}
          {listing.priceType === 'per_kg' ? '/kg' : ''}
        </Text>
        
        <View style={styles.detailsRow}>
          <Text style={styles.breed}>{listing.breed}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.age}>{listing.age}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.weight}>{listing.weight}</Text>
        </View>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color={COLORS.darkGray} />
          <Text style={styles.location}>{listing.location}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.sellerRow}>
          <Image source={{ uri: listing.sellerImage }} style={styles.sellerImage} />
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{listing.sellerName}</Text>
            <View style={styles.ratingContainer}>
              <Star size={12} color={COLORS.accent} fill={COLORS.accent} />
              <Text style={styles.rating}>{listing.sellerRating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={styles.date}>
            {new Date(listing.createdAt).toLocaleDateString()}
          </Text>
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
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: SIZES.base,
    left: SIZES.base,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius / 2,
  },
  featuredText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontFamily: 'Inter-Bold',
  },
  infoContainer: {
    padding: SIZES.padding,
  },
  title: {
    ...FONTS.h3,
    marginBottom: SIZES.base / 2,
  },
  price: {
    ...FONTS.h4,
    color: COLORS.primary,
    marginBottom: SIZES.base,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  breed: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  dot: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginHorizontal: SIZES.base / 2,
  },
  age: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  weight: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginLeft: SIZES.base / 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.base,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: SIZES.base,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    ...FONTS.body5,
    ...FONTS.medium,
    color: COLORS.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginLeft: SIZES.base / 2,
  },
  date: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
});