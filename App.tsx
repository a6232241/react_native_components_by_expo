import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { routes } from './src/route/routes';
import MenuPage from "./src/view/pages/Menu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={routes.menu}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={routes.menu} component={MenuPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}
