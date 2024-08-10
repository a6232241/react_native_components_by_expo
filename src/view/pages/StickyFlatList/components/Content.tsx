import { useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, Text, View } from "react-native";
import StickyFlatList from 'view/components/StickyFlatList';

const Content = () => {
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
    <StickyFlatList.List
      ref={listRef}
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
  );
};

export default Content;
