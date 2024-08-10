import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { headerHeight } from '../uiHelper';
import { Text, View } from 'react-native';

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, height: headerHeight }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Header</Text>
    </View>
  );
};

export default Header;