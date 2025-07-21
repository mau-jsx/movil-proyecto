import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useFonts, Montserrat_900Black, Montserrat_600SemiBold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/AuthStack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  if (!fontsLoaded) return null;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Fondo con gradiente y decoración */}
        <LinearGradient
          colors={['#f8f3ff', '#e9dcf2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        >
          {/* Elementos decorativos */}
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 1440 320"
            style={styles.decorativeTop}
            preserveAspectRatio="none"
          >
            <Path
              fill="rgba(255,255,255,0.3)"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>

          {/* Botón de regreso */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#1a1a2e" />
          </TouchableOpacity>

          {/* Contenido principal */}
          <View style={styles.contentContainer}>
            {/* Logo animado */}
            <Animatable.View 
              animation="fadeInDown"
              delay={200}
              duration={800}
              style={styles.logoContainer}
            >
              <View style={styles.logoBackground}>
                <Image
                  source={require('../assets/loign.png')}
                  style={styles.logoImage}
                />
              </View>
            </Animatable.View>

            {/* Títulos */}
            <Animatable.View
              animation="fadeInDown"
              delay={300}
              duration={800}
              style={styles.titleContainer}
            >
              <Text style={styles.titleText}>Bienvenido de vuelta</Text>
              <Text style={styles.subtitleText}>Ingresa a tu cuenta para continuar</Text>
            </Animatable.View>

            {/* Formulario */}
            <Animatable.View
              animation="fadeInUp"
              delay={400}
              duration={800}
              style={styles.formContainer}
            >
              {/* Campo de email */}
              <View style={[styles.inputContainer, isFocusedEmail && styles.inputFocused]}>
                <Feather 
                  name="mail" 
                  size={20} 
                  color={isFocusedEmail ? '#6d28d9' : '#8b5cf6'} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  placeholder="Correo electrónico"
                  placeholderTextColor="#a78bfa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                  style={styles.inputField}
                />
              </View>

              {/* Campo de contraseña */}
              <View style={[styles.inputContainer, isFocusedPassword && styles.inputFocused]}>
                <Feather 
                  name="lock" 
                  size={20} 
                  color={isFocusedPassword ? '#6d28d9' : '#8b5cf6'} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor="#a78bfa"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                  style={styles.inputField}
                />
                <TouchableOpacity 
                  onPress={toggleSecureEntry}
                  style={styles.eyeButton}
                >
                  <Feather 
                    name={secureTextEntry ? 'eye-off' : 'eye'} 
                    size={20} 
                    color={isFocusedPassword ? '#6d28d9' : '#8b5cf6'} 
                  />
                </TouchableOpacity>
              </View>

              {/* Botón de login */}
              <TouchableOpacity 
                style={styles.loginButton}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#8b5cf6', '#6d28d9']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Registro */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.registerLink}>Regístrate</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>

          {/* Ola decorativa inferior */}
          <View style={styles.bottomWave}>
            <Svg height="100%" width="100%" viewBox="0 0 1440 120" preserveAspectRatio="none">
              <Path 
                fill="white" 
                d="M0,0 C300,60 600,0 900,30 C1200,60 1440,0 1440,0 L1440,120 L0,120 Z" 
              />
            </Svg>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
  },
  decorativeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.7,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 10,
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#1a1a2e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBackground: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 100,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontFamily: 'Montserrat_900Black',
    fontSize: 28,
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    shadowColor: '#ddd6fe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputFocused: {
    borderColor: '#8b5cf6',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.2,
  },
  inputIcon: {
    marginRight: 15,
  },
  inputField: {
    flex: 1,
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#1a1a2e',
  },
  eyeButton: {
    padding: 5,
    marginLeft: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#8b5cf6',
  },
  loginButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
  },
  loginButtonText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
    color: '#6b7280',
  },
  registerLink: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
    color: '#8b5cf6',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});