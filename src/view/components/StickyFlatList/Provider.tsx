import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import StickyFlatListContext from './Context';
import { IStickyFlatListStyles } from './helper';

export type PropsType = {
  children: React.ReactNode;
  headerHeight?: number;
  stickyHeight?: number;
  stickyVerticalOffset?: number;
  backgroundZoomRatio?: number;
};

// NOTE. styles.container, onScroll, scrollY 是給 children 裡面的 FlatList 使用的
const Provider = ({
  children,
  headerHeight: defaultHeaderHeight,
  stickyHeight: defaultStickyHeight,
  stickyVerticalOffset,
  backgroundZoomRatio = 1
}: PropsType) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(defaultHeaderHeight);
  const [stickyHeight, setStickyHeight] = useState(defaultStickyHeight);
  const heights = useMemo(() => ({
    header: headerHeight ?? 0,
    sticky: stickyHeight ?? 0
  }), [headerHeight, stickyHeight]);
  const { height: windowHeight } = useWindowDimensions();

  const styles: IStickyFlatListStyles = useMemo(() => ({
    header: {
      position: 'absolute',
      transform: [
        {
          translateY: scrollY.interpolate({
            extrapolate: 'clamp',
            inputRange: [-windowHeight, heights.header],
            outputRange: [windowHeight, -heights.header]
          })
        }
      ],
      width: '100%',
      zIndex: 1
    },
    sticky: {
      marginTop: heights.header,
      position: 'absolute',
      transform: [
        {
          translateY: scrollY.interpolate({
            extrapolate: 'clamp',
            inputRange: [-windowHeight, heights.header - (stickyVerticalOffset ?? 0)],
            outputRange: [windowHeight, -heights.header + (stickyVerticalOffset ?? 0)]
          })
        }
      ],
      zIndex: 3,
      width: '100%'
    },
    stickyOffset: {
      marginTop: heights.header,
      position: 'absolute',
      transform: [
        {
          translateY: scrollY.interpolate({
            extrapolate: 'clamp',
            inputRange: [-windowHeight, heights.header],
            outputRange: [windowHeight, -heights.header]
          })
        }
      ],
      zIndex: 2,
      width: '100%',
      height: stickyVerticalOffset ?? 0
    },
    list: { paddingTop: heights.header + heights.sticky },
    background: {
      position: 'absolute',
      transform: [
        {
          translateY: scrollY.interpolate({
            extrapolate: 'clamp',
            inputRange: [0, heights.header],
            outputRange: [0, -heights.header]
          })
        },
        {
          scale: scrollY.interpolate({
            extrapolate: 'clamp',
            inputRange: [-windowHeight, 0],
            // NOTE. 如果手機很長，並且向下拉動的距離足夠長，可能導致背景出現在 list 的下方
            outputRange: [backgroundZoomRatio, 1]
          })
        }
      ],
      width: '100%',
      zIndex: 0
    }
  }), [scrollY, heights.header, heights.sticky]);

  return (
    <StickyFlatListContext.Provider
      value={{
        scrollY, styles, setHeaderHeight, setStickyHeight,
        stickyVerticalOffset: stickyVerticalOffset ?? 0
      }}
    >
      {children}
    </StickyFlatListContext.Provider>
  );
};

export default Provider;