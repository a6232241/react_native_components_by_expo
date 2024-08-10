import { useCallback } from 'react';
import { Animated, FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useStickyFlatListContext } from './Context';

interface PropsType<ItemT> extends
  Animated.AnimatedProps<FlatListProps<ItemT>> {
  ref?: React.MutableRefObject<Animated.FlatList<any> | null>;
}

const List = <itemT,>({ ...props }: PropsType<itemT>) => {
  const { onScroll, styles } = useStickyFlatListContext();

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll(event);
    props?.onScroll?.(event);
  }, [props?.onScroll]);

  return <Animated.FlatList
    {...props}
    onScroll={handleScroll}
    contentContainerStyle={[props?.contentContainerStyle, styles.list]}
  />;
};

export default List;