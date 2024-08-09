import React, { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  ColorValue,
  Keyboard,
  PanResponder,
  Platform,
  Modal as RNModal,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PropsType = {
  children: ReactNode;
  onClose?: () => Promise<void> | void;
  isTapToClose?: boolean;
  bg?: ColorValue | undefined;
  carouselPosition?: Animated.ValueXY;
  animationType?: "slide" | "none" | "fade" | undefined;
  // only android
  statusBarTranslucent?: boolean;
};

export const Modal = ({
  children,
  onClose,
  isTapToClose = true,
  bg = "rgba(0,0,0,.7)",
  carouselPosition,
  animationType: PropsAnimationType,
  statusBarTranslucent = true,
}: PropsType) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        if (onClose) pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: async () => {
        if (Math.abs((pan.y as any)._value) < 10) Keyboard.dismiss();
        if (onClose && (pan.y as any)._value > 150) {
          Keyboard.dismiss();
          await onClose();
        }
        pan.setValue({ x: 0, y: 0 });
      },
    }),
  ).current;

  return (
    <>
      {Platform.OS === "ios" ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: windowWidth,
            height: windowHeight,
            backgroundColor: bg,
          }}
        />
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: windowWidth,
            height: windowHeight + insets.top,
            backgroundColor: bg,
          }}
        />
      )}

      <RNModal
        transparent
        animationType={PropsAnimationType ?? "slide"}
        statusBarTranslucent={statusBarTranslucent}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "flex-end",
            // background no color android panResponder can't work
            backgroundColor: "rgba(0,0,0,0)",
          }}
          {...panResponder.panHandlers}
        >
          {isTapToClose && (
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          )}
          <Animated.View
            style={{
              transform: [
                {
                  translateY: Animated.divide(
                    carouselPosition?.y ? carouselPosition.y : pan.y,
                    2,
                  ),
                },
              ],
            }}
          >
            {children}
          </Animated.View>
        </View>
      </RNModal>
    </>
  );
};

export default Modal;
