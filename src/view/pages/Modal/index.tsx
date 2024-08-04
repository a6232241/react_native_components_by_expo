import { useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "./components/Modal";
import Card from "./components/Card";

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Button title="Open Modal" onPress={() => setIsOpen(true)} />
      </View>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Card
            style={{ backgroundColor: "#101010", width: "100%", height: 400 }}
            hasBar
          >
            <Text style={{ color: "white" }}>I'am Modal</Text>
          </Card>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default ModalPage;
