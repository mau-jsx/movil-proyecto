import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import {
  useFonts,
  Montserrat_900Black,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.waveWrapper}>
          <Svg height="120" width="100%" viewBox="0 0 1440 320" style={styles.wave}>
            <Path fill="white" d="M0,-50 C360,240 720,100 1440,-50 L1440,320 L0,320 Z" />
          </Svg>

          <View style={styles.whiteBox}>
            <Text style={styles.title}>Bienvenido a ClimaGuard</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
              <Feather name="log-in" size={16} color="#1a1a2e" />
              <Text style={styles.linkText}>Ya tengo cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  waveWrapper: {
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    top: -100,
    width: '100%',
  },
  whiteBox: {
    backgroundColor: 'white',
    paddingTop: 290,
    paddingBottom: 40,
    paddingHorizontal: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    marginTop: -20,
  },
  title: {
    fontFamily: 'Montserrat_900Black',
    fontSize: 40,
    top: -270,
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: -50,
  },
  button: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    top: -150,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  link: {
    top: -136,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#1a1a2e',
    marginLeft: 8,
  },
});
