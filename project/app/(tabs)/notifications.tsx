import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Bell, MessageCircle, ShoppingBag, Tag } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { getNotifications } from '@/data/notifications';

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const notifications = getNotifications();
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle size={20} color={COLORS.primary} />;
      case 'offer':
        return <Tag size={20} color={COLORS.accent} />;
      case 'purchase':
        return <ShoppingBag size={20} color={COLORS.success} />;
      default:
        return <Bell size={20} color={COLORS.secondary} />;
    }
  };
  
  const renderNotificationItem = ({ item }: { item: ReturnType<typeof getNotifications>[0] }) => {
    return (
      <TouchableOpacity 
        style={[
          styles.notificationItem,
          !item.read && styles.unreadNotification,
          { backgroundColor: theme.colors.cardBackground }
        ]}
        onPress={() => {
          // Handle notification press
          // In a real app, we would mark the notification as read
          // and navigate to the relevant screen
        }}
      >
        <View style={styles.notificationIconContainer}>
          {getIconForType(item.type)}
        </View>
        
        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          <Text style={styles.notificationMessage}>
            {item.message}
          </Text>
          <Text style={styles.notificationTime}>
            {item.time}
          </Text>
        </View>
        
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.notificationImage} />
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notifications</Text>
          <TouchableOpacity style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Bell size={48} color={COLORS.gray} />
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>No notifications yet</Text>
              <Text style={styles.emptySubtext}>We'll notify you when something happens</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    height: 60,
  },
  headerTitle: {
    ...FONTS.h2,
  },
  markAllButton: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
  },
  markAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  listContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base * 2,
  },
  notificationContent: {
    flex: 1,
    marginRight: SIZES.base,
  },
  notificationTitle: {
    ...FONTS.h4,
    marginBottom: SIZES.base / 2,
  },
  notificationMessage: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: SIZES.base / 2,
  },
  notificationTime: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius / 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding * 3,
  },
  emptyText: {
    ...FONTS.h3,
    marginTop: SIZES.padding,
    marginBottom: SIZES.base,
  },
  emptySubtext: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});