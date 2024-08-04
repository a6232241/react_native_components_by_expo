import { useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { headerHeight, stickyBgColor, stickyHeight } from '../uiHelper';
import Background from './Background';
import StickyFlatList from './StickyFlatList';
import { useStickyFlatListContext } from './StickyFlatList/Context';

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, height: headerHeight }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Header</Text>
    </View>
  );
};

const StickyHeader = () => {
  return (
    <View style={{ height: stickyHeight, backgroundColor: stickyBgColor }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Sticky Header</Text>
    </View>
  );
};

export const Content = () => {
  const { onScroll, styles: stickyFlatListStyles } = useStickyFlatListContext();
  const listRef = useRef<Animated.FlatList<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  return (
    <StickyFlatList
      HeaderComponent={<Header />}
      HeaderComponentStyle={{ height: headerHeight }}
      StickyComponent={<StickyHeader />}
      StickyComponentStyle={{ height: stickyHeight }}
      StickyComponentOffsetBackground={stickyBgColor}
      BackgroundComponent={<Background source={'https://www.w3schools.com/w3images/mountains.jpg'} contentHeight={headerHeight} />}
    >
      <Animated.FlatList
        ref={listRef}
        onScroll={onScroll}
        contentContainerStyle={stickyFlatListStyles.container}

        scrollEventThrottle={16}
        data={[...Array(100).keys()]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={{ height: 100, backgroundColor: 'green' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            tintColor='white'
            refreshing={isLoading}
            onRefresh={() => setIsLoading(true)}
          />
        }
      />
    </StickyFlatList>
  );
};