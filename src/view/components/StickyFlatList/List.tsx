import { ComponentProps } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface PropsType<ItemT> extends
  Omit<ComponentProps<typeof Animated.FlatList<ItemT>>, 'onScroll'>,
  React.RefAttributes<Animated.FlatList<ItemT>> {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const List = <itemT,>({ onScroll, ...props }: PropsType<itemT>) => {
  return <Animated.FlatList {...props} onScroll={onScroll} />;
};

export default List;