import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '~/screens/DashboardScreen';

export type AppStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={DashboardScreen} options={{ headerTitle: 'Inicio' }} />
    </Stack.Navigator>
  );
};

export default AppStack;
