import { View, Text } from 'react-native';
import { logoutUser } from '~/services/authService';
import '../../global.css';

export default function DashboardScreen() {
  const hadleLogut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold">Dashboard</Text>
      <Text onPress={hadleLogut}>Logout</Text>
    </View>
  );
}
