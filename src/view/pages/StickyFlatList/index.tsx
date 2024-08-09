import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StickyFlatList from 'view/components/StickyFlatList';
import { Content } from './components/Content';
import { headerHeight, stickyHeight } from './uiHelper';

export default function StickyFlatListPage() {
  const insets = useSafeAreaInsets();

  return (
    <StickyFlatList.Provider
      headerHeight={headerHeight}
      stickyHeight={stickyHeight}
      stickyComponentOffset={insets.top}
      backgroundMaxRatio={6}
    >
      <Content />
    </StickyFlatList.Provider>
  );
}

