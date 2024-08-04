import { ReactNode } from "react";
import { Platform, View, ViewStyle } from "react-native";

type PropsType = {
  children: ReactNode;
  hasBar?: boolean;
  contentShadowColor?: string;
  style?: ViewStyle;
};

const Card = ({ children, hasBar, contentShadowColor, style }: PropsType) => {
  return (
    <View
      style={{
        paddingTop: hasBar ? 40 : 0,
        paddingBottom: 40,
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#101010",
        overflow: "hidden",
        ...Platform.select({
          ios: {
            shadowColor: contentShadowColor ?? "black",
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
          android: { elevation: 2 },
        }),
        ...style,
      }}
    >
      {children}
      {hasBar && (
        <View
          style={{
            backgroundColor: "gray",
            position: "absolute",
            width: 48,
            height: 4,
            borderRadius: 30,
            margin: 16,
            alignSelf: "center",
          }}
        />
      )}
    </View>
  );
};

export default Card;
