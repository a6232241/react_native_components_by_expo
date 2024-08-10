import { Text, View } from 'react-native';
import { stickyBgColor, stickyHeight } from '../uiHelper';

const StickyHeader = () => {
  return (
    <View style={{ height: stickyHeight, backgroundColor: stickyBgColor }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Sticky Header</Text>
    </View>
  );
};

export default StickyHeader;