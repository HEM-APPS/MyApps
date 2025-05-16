import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  // Set up timer for resend functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);
  
  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }
    
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index].length && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handleResend = () => {
    if (canResend) {
      // Reset OTP inputs
      setOtp(['', '', '', '']);
      // Reset timer
      setTimer(30);
      setCanResend(false);
      // Focus on first input
      inputRefs.current[0]?.focus();
      
      // In a real app, we would trigger the OTP resend API here
    }
  };
  
  const handleVerify = () => {
    const otpString = otp.join('');
    
    // Check if OTP is complete
    if (otpString.length === 4) {
      // In a real app, we would verify the OTP with an API
      // For demo purposes, we'll just check if it's "1234"
      if (otpString === "1234") {
        router.push('/auth/register');
      } else {
        // Show error for demo
        alert('Invalid OTP. Try "1234" for demo.');
      }
    }
  };
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Animated.View entering={FadeInUp.duration(500).delay(100)}>
            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.subtitle}>
              We've sent an OTP to +91 {phone || '**********'}
            </Text>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(300)} style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpInputWrapper}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0}
                />
              </View>
            ))}
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.resendContainer}>
            <Text style={styles.resendText}>
              {canResend ? (
                <Text>
                  Didn't receive code?{' '}
                  <Text style={styles.resendLink} onPress={handleResend}>
                    Resend
                  </Text>
                </Text>
              ) : (
                <Text>
                  Resend code in{' '}
                  <Text style={styles.timerText}>{timer}s</Text>
                </Text>
              )}
            </Text>
          </Animated.View>
          
          <Animated.View entering={FadeInUp.duration(500).delay(700)} style={styles.bottomContainer}>
            <TouchableOpacity 
              style={[
                styles.button, 
                otp.join('').length !== 4 && styles.buttonDisabled
              ]}
              onPress={handleVerify}
              disabled={otp.join('').length !== 4}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  otpInputWrapper: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: COLORS.black,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  resendText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  resendLink: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  timerText: {
    ...FONTS.body4,
    color: COLORS.primary,
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
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});