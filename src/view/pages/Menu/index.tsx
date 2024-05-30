import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Item from './components/Item';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../route/routes';

export default function MenuPage() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Item title='Go to StickyFlatList' onPress={() => navigation.push(routes.stickyFlatList)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
