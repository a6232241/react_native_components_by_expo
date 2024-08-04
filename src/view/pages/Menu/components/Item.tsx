import { Text, TouchableHighlight, TouchableHighlightProps, View } from "react-native";

const Item = ({ title, style, ...props }: { title: string; } & TouchableHighlightProps) => {
  return <View style={{ height: 50 }}>
    <TouchableHighlight
      style={[
        { flex: 1 },
        style
      ]}
      {...props}
    >
      <View style={{
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
      }}>
        <Text style={{ textAlign: 'center' }}>{title}</Text>
      </View>
    </TouchableHighlight>
  </View>;
};

export default Item;