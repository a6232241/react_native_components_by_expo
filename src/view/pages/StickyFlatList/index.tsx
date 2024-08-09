import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Content } from './components/Content';
import StickyFlatListProvider from 'view/components/StickyFlatList/Provider';
import { headerHeight, stickyHeight } from './uiHelper';

export default function StickyFlatListPage() {
  const insets = useSafeAreaInsets();

  return (
    <StickyFlatListProvider
      headerHeight={headerHeight}
      stickyHeight={stickyHeight}
      stickyComponentOffset={insets.top}
      backgroundMaxRatio={6}
    >
      <View style={styles.container}>
        <Content />
      </View>
    </StickyFlatListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
