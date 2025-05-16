import { Stack } from 'expo-router/stack';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="phone" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="register" />
      <Stack.Screen name="language" />
    </Stack>
  );
}