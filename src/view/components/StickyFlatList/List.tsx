import { useCallback } from 'react';
import { Animated, FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useStickyFlatListContext } from './Context';

interface PropsType<ItemT> extends
  Animated.AnimatedProps<FlatListProps<ItemT>> {
  ref?: React.MutableRefObject<Animated.FlatList<any> | null>;
}

const List = <itemT,>({ ...props }: PropsType<itemT>) => {
  const { styles, scrollY } = useStickyFlatListContext();

  const onScroll = useCallback(Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: props?.onScroll
    }
  ), [scrollY, props?.onScroll]);

  return <Animated.FlatList
    {...props}
    onScroll={onScroll}
    contentContainerStyle={[props?.contentContainerStyle, styles.list]}
  />;
};

export default List;