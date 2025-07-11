import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/AuthStack';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import {
  useFonts,
  Montserrat_900Black,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const { height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useAuth();

  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      await SecureStore.setItemAsync('session', 'active');
      login();
    } catch (err: any) {
      const message = Array.isArray(err)
        ? err.join('\n')
        : err?.message || 'Error al iniciar sesión';
      Alert.alert('Error', message);
    }
  };

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      {/* Encabezado animado */}
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={{ backgroundColor: 'white', borderBottomRightRadius: 60, paddingBottom: 60 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 60,
            left: 24,
            zIndex: 10,
            backgroundColor: 'rgba(26, 26, 46, 0.1)',
            borderRadius: 20,
            padding: 8,
          }}>
          <Feather name="arrow-left" size={24} color="#1a1a2e" />
        </TouchableOpacity>
        <View style={{ paddingTop: 120, paddingHorizontal: 24 }}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>Bienvenido a ClimaGuard</Text>
        </View>
      </Animatable.View>

      {/* Formulario centrado con animaciones */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          delay={300}
          style={[styles.form, { marginTop: -height * 0.1 }]}>
          {/* Input Email con animación */}
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            delay={500}
            style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </Animatable.View>

          {/* Input Contraseña con animación */}
          <Animatable.View
            animation="fadeInRight"
            duration={1000}
            delay={700}
            style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
              <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
            </TouchableOpacity>
          </Animatable.View>

          {/* Botón de Login con animación */}
          <Animatable.View animation="fadeInUp" duration={1000} delay={900}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.loginText}>Entrar</Text>
              <Feather name="arrow-right" size={20} color="#1a1a2e" />
            </TouchableOpacity>
          </Animatable.View>

          {/* Divider con animación */}
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            delay={1100}
            style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </Animatable.View>

          {/* Botón Google con animación */}
          <Animatable.View animation="fadeInUp" duration={1000} delay={1300}>
            <TouchableOpacity style={styles.googleButton}>
              <FontAwesome name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
              <Text style={styles.googleText}>Continuar con Google</Text>
            </TouchableOpacity>
          </Animatable.View>
          {/* Ir a Registro con animación */}
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            delay={1500}
            style={styles.registerRow}>
            <Text style={styles.registerPrompt}>¿No tenés cuenta?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.registerLink}>
              <Text style={styles.registerText}>Registrate</Text>
              <Feather name="arrow-right" size={16} color="white" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: 'Montserrat_900Black',
    color: '#1a1a2e',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#475569',
    marginTop: 8,
    textAlign: 'left',
  },
  form: {
    padding: 24,
    marginBottom: height * 0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#94a3b8',
    fontFamily: 'Montserrat_400Regular',
    marginHorizontal: 10,
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  googleText: {
    color: '#1a1a2e',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  registerPrompt: {
    color: '#cbd5e1',
    fontFamily: 'Montserrat_400Regular',
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  registerText: {
    color: 'white',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
  },
});

export default LoginScreen;
