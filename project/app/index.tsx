import { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function WelcomeScreen() {
  useEffect(() => {
    // Check if user is already logged in
    // For demo purposes, we're not persisting authentication
    // In a real app, you would check AsyncStorage or similar
    const isLoggedIn = false;
    
    if (isLoggedIn) {
      router.replace('/(tabs)');
    }
  }, []);

  const handleGetStarted = () => {
    router.push('/auth/phone');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.gradient}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.logoImage}
            />
          </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>PetTrade</Text>
            <Text style={styles.subtitle}>Buy and sell animals with ease</Text>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(900).duration(600)} style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 36,
    color: COLORS.white,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
});