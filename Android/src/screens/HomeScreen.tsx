import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useFonts,
  Montserrat_900Black,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/AuthStack';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<AuthStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 bg-[#f5f0fa]">
      {/* Gradient background */}
      <LinearGradient
        colors={['#f5f0fa', '#e9dcf2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      {/* Top section */}
      <View className="flex-1 justify-center items-center px-6 pt-12">
        <View className="bg-white p-6 rounded-full shadow-lg shadow-[#1a1a2e]/20 mb-8">
          <Image
            source={require('../assets/climarHome.png')}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        <Text
          className="text-center text-[34px] text-[#1a1a2e] mb-3"
          style={{ fontFamily: 'Montserrat_900Black' }}>
          Bienvenido a ClimaGuard
        </Text>

        <Text
          className="text-center text-base text-[#4a4a6a] mt-2 px-8 leading-6"
          style={{ fontFamily: 'Montserrat_400Regular' }}>
          Tu aliado para anticiparte y protegerte ante desastres naturales.
        </Text>
      </View>

      {/* Wave divider */}
      <View className="relative h-24 -mt-12">
        <Svg height="100%" width="100%" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <Path 
            fill="white" 
            d="M0,0 C300,60 600,0 900,30 C1200,60 1440,0 1440,0 L1440,120 L0,120 Z" 
          />
        </Svg>
      </View>

      {/* Bottom section */}
      <View className="bg-white px-10 pt-8 pb-10">
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="w-full bg-[#1a1a2e] py-4 rounded-xl mb-4 shadow-md shadow-[#1a1a2e]/30"
          activeOpacity={0.8}>
          <Text
            className="text-white text-center text-lg py-2"
            style={{ fontFamily: 'Montserrat_600SemiBold' }}>
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="flex-row items-center justify-center mt-4 py-3"
          activeOpacity={0.7}>
          <Feather name="log-in" size={18} color="#1a1a2e" />
          <Text
            className="text-[#1a1a2e] text-base ml-2"
            style={{ fontFamily: 'Montserrat_500SemiBold' }}>
            Ya tengo una cuenta
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-gray-400 mt-6" style={{ fontFamily: 'Montserrat_400Regular' }}>
          Al continuar aceptas nuestros Términos y Condiciones
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: '#1a1a2e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});