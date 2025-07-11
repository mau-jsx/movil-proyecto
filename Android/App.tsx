// App.tsx
import React from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import { View, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';

// 👉 Ignora el warning molesto de Reanimated
LogBox.ignoreLogs(['[Reanimated] Reading from `value` during component render']);

export default function App() {
  return (
    <AuthProvider>
      <View className="flex-1">
        <RootNavigator />
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}
