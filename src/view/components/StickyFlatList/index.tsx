import React, { useCallback } from 'react';
import { Animated, ColorValue, LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { useStickyFlatListContext } from './Context';

type PropsType = {
  style?: StyleProp<ViewStyle>;
  HeaderComponent?: JSX.Element;
  HeaderComponentStyle?: StyleProp<ViewStyle> | undefined;
  StickyComponent: JSX.Element;
  StickyComponentStyle?: StyleProp<ViewStyle> | undefined;
  StickyComponentOffsetBackground?: ColorValue;
  children: JSX.Element;
  BackgroundComponent?: JSX.Element;
};

function StickyFlatList({
  style,
  HeaderComponent,
  HeaderComponentStyle,
  StickyComponent,
  StickyComponentStyle,
  StickyComponentOffsetBackground,
  children,
  BackgroundComponent
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
        BackgroundComponent &&
        <Animated.View
          style={[styles.background]}
          pointerEvents={'box-none'}
        >
          {BackgroundComponent}
        </Animated.View>
      }

      {
        HeaderComponent && <Animated.View
          style={[styles.header, HeaderComponentStyle]}
          onLayout={onLayoutHeaderComponent}
          pointerEvents={'box-none'}
        >
          {HeaderComponent}
        </Animated.View>
      }

      <Animated.View
        style={[styles.sticky, StickyComponentStyle]}
        onLayout={onLayoutStickyComponent}
      >
        {StickyComponent}
      </Animated.View>

      {
        <Animated.View
          style={[
            styles.stickyOffset,
            { backgroundColor: StickyComponentOffsetBackground }
          ]}
        />
      }

      {children}
    </View>
  );
}

export default StickyFlatList;