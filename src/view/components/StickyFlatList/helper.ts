import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';

export type IStickyFlatListStyles = {
  header: StyleProp<ViewStyle>;
  sticky: StyleProp<ViewStyle>;
  stickyOffset: StyleProp<ViewStyle>;
  list: StyleProp<ViewStyle>;
  background?: StyleProp<ViewStyle>;
};

export type StickyFlatListContextType = {
  scrollY: Animated.Value;
  styles: IStickyFlatListStyles;
  stickyVerticalOffset: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStickyHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
};