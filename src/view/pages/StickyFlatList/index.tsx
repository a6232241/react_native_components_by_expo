import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StickyFlatList from 'view/components/StickyFlatList';
import { headerHeight, stickyBgColor, stickyHeight } from './uiHelper';
import Header from './components/Header';
import StickyHeader from './components/StickyHeader';
import Background from './components/Background';
import Content from './components/Content';

export default function StickyFlatListPage() {
  const insets = useSafeAreaInsets();

  return (
    <StickyFlatList.Container
      headerHeight={headerHeight}
      stickyHeight={stickyHeight}
      stickyVerticalOffset={insets.top}
      backgroundZoomRatio={6}

      header={<Header />}
      sticky={<StickyHeader />}
      stickyVerticalOffsetBgColor={stickyBgColor}
      background={<Background source={'https://www.w3schools.com/w3images/mountains.jpg'} contentHeight={headerHeight} />}
    >
      <Content />
    </StickyFlatList.Container>
  );
}

