import { createContext, useContext } from 'react';
import { Animated } from 'react-native';
import { StickyFlatListContextType } from './helper';

const defaultValue = {
  scrollY: new Animated.Value(0),
  styles: {
    header: {},
    sticky: {},
    stickyOffset: {},
    list: {}
  },
  stickyVerticalOffset: 0,
  setHeaderHeight: () => { },
  setStickyHeight: () => { },
};

const StickyFlatListContext = createContext<StickyFlatListContextType>(defaultValue);
export const useStickyFlatListContext = () => useContext(StickyFlatListContext);
export default StickyFlatListContext;
