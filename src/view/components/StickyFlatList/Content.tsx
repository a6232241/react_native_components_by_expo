import React, { useCallback } from 'react';
import { Animated, ColorValue, LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { useStickyFlatListContext } from './Context';

export type PropsType = {
  style?: StyleProp<ViewStyle>;
  header?: JSX.Element;
  headerStyle?: StyleProp<ViewStyle> | undefined;
  sticky: JSX.Element;
  stickyStyle?: StyleProp<ViewStyle> | undefined;
  stickyVerticalOffsetBgColor?: ColorValue;
  children: JSX.Element;
  background?: JSX.Element;
};

function Content({
  style,
  header,
  headerStyle,
  sticky,
  stickyStyle,
  stickyVerticalOffsetBgColor,
  children,
  background
}: PropsType): React.ReactNode {
  const { styles, setHeaderHeight, setStickyHeight } = useStickyFlatListContext();

  const onLayoutHeaderComponent = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event?.nativeEvent?.layout?.height ?? 0);
  }, []);

  const onLayoutStickyComponent = useCallback((event: LayoutChangeEvent) => {
    setStickyHeight(event?.nativeEvent?.layout?.height ?? 0);
  }, []);

  return (
    <View style={[{ flex: 1, overflow: 'hidden' }, style]}>
      {
        background &&
        <Animated.View
          style={[styles.background]}
          pointerEvents={'box-none'}
        >
          {background}
        </Animated.View>
      }

      {
        header && <Animated.View
          style={[headerStyle, styles.header]}
          onLayout={onLayoutHeaderComponent}
          pointerEvents={'box-none'}
        >
          {header}
        </Animated.View>
      }

      <Animated.View
        style={[stickyStyle, styles.sticky]}
        onLayout={onLayoutStickyComponent}
      >
        {sticky}
      </Animated.View>

      {
        <Animated.View
          style={[
            styles.stickyOffset,
            { backgroundColor: stickyVerticalOffsetBgColor }
          ]}
        />
      }

      {children}
    </View>
  );
}

export default Content;