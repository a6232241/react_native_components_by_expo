import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';

export type IStickyFlatListStyles = {
  header: StyleProp<ViewStyle>;
  sticky: StyleProp<ViewStyle>;
  stickyOffset: StyleProp<ViewStyle>;
  container: StyleProp<ViewStyle>;
  background?: StyleProp<ViewStyle>;
};

export type StickyFlatListContextType = {
  scrollY: Animated.Value;
  styles: IStickyFlatListStyles;
  stickyComponentOffset: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStickyHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  onScroll: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void);
};