import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/AuthStack';
import { verifyEmail } from '../services/authService';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

type Props = NativeStackScreenProps<AuthStackParamList, 'VerifyEmail'>;

const VerifyEmailScreen = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleVerify = async () => {
    const verificationCode = digits.join('');
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Por favor ingresa el código completo de 6 dígitos');
      return;
    }

    try {
      await verifyEmail(email, verificationCode);
      Alert.alert('Éxito', 'Correo verificado correctamente.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error verificando el correo');
    }
  };

  const handleChangeDigit = (text: string, index: number) => {
    // Solo permitir números y un solo dígito
    const newText = text.replace(/[^0-9]/g, '').slice(0, 1);

    const newDigits = [...digits];
    newDigits[index] = newText;
    setDigits(newDigits);
    if (newText && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (!newText && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const focusFirstInput = () => {
    inputs.current[0]?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Fondo degradado */}
        <LinearGradient
          colors={['#F8FAFC', '#E0F2FE', '#BAE6FD']}
          style={styles.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <View style={styles.content}>
          <Animatable.View animation="bounceIn" duration={1500} style={styles.iconContainer}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <MaterialIcons name="mark-email-read" size={40} color="white" />
            </LinearGradient>
          </Animatable.View>

          {/* Título */}
          <Animatable.Text animation="fadeInUp" duration={800} style={styles.title}>
            Verificación de Email
          </Animatable.Text>

          {/* Subtítulo */}
          <Animatable.Text animation="fadeInUp" duration={800} delay={200} style={styles.subtitle}>
            Hemos enviado un código de 6 dígitos a:
          </Animatable.Text>

          {/* Email */}
          <Animatable.Text animation="fadeInUp" duration={800} delay={300} style={styles.emailText}>
            {email}
          </Animatable.Text>

          {/* Contenedor de inputs de dígitos */}
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            delay={400}
            style={styles.digitsContainer}>
            <TouchableWithoutFeedback onPress={focusFirstInput}>
              <View style={styles.digitsInputContainer}>
                {digits.map((digit, index) => (
                  <TextInput
                    ref={(ref: TextInput | null) => {
                      inputs.current[index] = ref;
                    }}
                    key={index}
                    style={[styles.digitInput, digit && styles.filledDigit]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChangeDigit(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    textAlign="center"
                    returnKeyType="next"
                    selectTextOnFocus
                  />
                ))}
              </View>
            </TouchableWithoutFeedback>
          </Animatable.View>

          {/* Botón de verificación */}
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            delay={600}
            style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleVerify} activeOpacity={0.8}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <Text style={styles.buttonText}>Verificar Código</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>

          {/* Opción de reenviar código */}
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            delay={700}
            style={styles.resendContainer}>
            <Text style={styles.resendText}>¿No recibiste el código? </Text>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Reenviar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    marginBottom: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 32,
    textAlign: 'center',
  },
  digitsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  digitsInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  digitInput: {
    width: 50,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filledDigit: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#64748B',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
});

export default VerifyEmailScreen;
