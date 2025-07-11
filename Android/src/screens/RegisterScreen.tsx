import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/AuthStack';
import { registerUser } from '../services/authService';
import { getProvincias, getLocalidades, Provincia, Localidad } from '../services/geoService';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import {
  useFonts,
  Montserrat_900Black,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [localidades, setLocalidades] = useState<Localidad[]>([]);

  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  useEffect(() => {
    getProvincias()
      .then(setProvincias)
      .catch(() => Alert.alert('Error', 'No se pudieron cargar las provincias'));
  }, []);

  useEffect(() => {
    if (province) {
      getLocalidades(province)
        .then(setLocalidades)
        .catch(() => Alert.alert('Error', 'No se pudieron cargar las localidades'));
    } else {
      setLocalidades([]);
    }
  }, [province]);

  const handleRegister = async () => {
    if (!name || !email || !province || !city || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    try {
      await registerUser({ name, email, province, city, password });
      Alert.alert('Éxito', 'Registro exitoso. Verificá tu correo.');
      navigation.navigate('VerifyEmail', { email });
    } catch (err: any) {
      const mensaje = Array.isArray(err)
        ? err.join('\n')
        : err?.message || 'Error inesperado al registrar';
      Alert.alert('Error', mensaje);
    }
  };

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Encabezado animado */}
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          style={{ backgroundColor: 'white', borderBottomRightRadius: 60 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 16,
              position: 'absolute',
              top: 40,
              left: 16,
              zIndex: 3,
              backgroundColor: 'rgba(26, 26, 46, 0.1)',
              borderRadius: 20,
            }}>
            <Feather name="arrow-left" size={24} color="#1a1a2e" />
          </TouchableOpacity>

          <Animatable.View
            animation="fadeIn"
            duration={1000}
            delay={300}
            style={{
              alignItems: 'flex-start',
              paddingTop: 120,
              paddingBottom: 50,
              paddingHorizontal: 24,
            }}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.subtitle}>Empezá tu nueva aventura con ClimaGuard</Text>
          </Animatable.View>

          <Svg width="100%" height={100} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path
              fill="#1a1a2e"
              d="M0,160C80,186.7,160,213,240,197.3C320,181,400,123,480,122.7C560,123,640,181,720,186.7C800,192,880,144,960,144C1040,144,1120,192,1200,208C1280,224,1360,208,1400,197.3L1440,187V320H0Z"
            />
          </Svg>
        </Animatable.View>

        {/* Formulario con animaciones */}
        <View style={{ backgroundColor: '#1a1a2e', flex: 1, padding: 24, paddingTop: 48 }}>
          <Animatable.View animation="fadeInUp" duration={800} delay={200}>
            <CustomInput
              placeholder="Nombre completo"
              value={name}
              onChangeText={setName}
              icon="user"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={300}>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={400}>
            <CustomPicker
              selectedValue={province}
              onValueChange={setProvince}
              items={provincias.map((p) => ({ label: p.nombre, value: p.nombre }))}
              placeholder="Selecciona una provincia"
              icon="map-pin"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={500}>
            <CustomPicker
              selectedValue={city}
              onValueChange={setCity}
              items={localidades.map((l) => ({ label: l.nombre, value: l.nombre }))}
              placeholder="Selecciona una ciudad"
              enabled={province !== ''}
              icon="map"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={600}>
            <CustomInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              onToggleSecure={toggleSecureEntry}
              icon="lock"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={700}>
            <TouchableOpacity
              style={[styles.button, (!name || !email || !password) && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={!name || !email || !password}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>Registrarse</Text>
              <Feather name="arrow-right" size={20} color="#1a1a2e" />
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View
            animation="fadeIn"
            duration={1000}
            delay={900}
            style={styles.loginPrompt}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Iniciar sesión</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  onToggleSecure,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon,
}: any) => (
  <View style={styles.inputContainer}>
    <Feather name={icon} size={20} color="#94a3b8" style={styles.inputIcon} />
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
    {onToggleSecure && (
      <TouchableOpacity onPress={onToggleSecure} style={styles.eyeIcon}>
        <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
      </TouchableOpacity>
    )}
  </View>
);

const CustomPicker = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  enabled = true,
  icon,
}: any) => (
  <View style={[styles.inputContainer, { opacity: enabled ? 1 : 0.6 }]}>
    <Feather name={icon} size={20} color="#94a3b8" style={styles.inputIcon} />
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
      dropdownIconColor="#94a3b8"
      enabled={enabled}>
      <Picker.Item label={placeholder} value="" style={styles.pickerItem} />
      {items.map((item: any, idx: number) => (
        <Picker.Item key={idx} label={item.label} value={item.value} style={styles.pickerItem} />
      ))}
    </Picker>
  </View>
);

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  eyeIcon: {
    padding: 8,
  },
  picker: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    height: 50,
    fontFamily: 'Montserrat_400Regular',
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    marginRight: 8,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: '#cbd5e1',
    fontFamily: 'Montserrat_400Regular',
  },
  loginLink: {
    color: 'white',
    fontFamily: 'Montserrat_600SemiBold',
  },
});

export default RegisterScreen;
