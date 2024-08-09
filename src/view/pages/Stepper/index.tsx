import { useState } from 'react';
import { Text } from 'react-native';
import Stepper from 'view/components/Stepper';
import { SafeAreaView } from 'react-native-safe-area-context';

const StepperPage = <T,>() => {
  const [list, setList] = useState<number[]>([1, 2, 3, 4, 5]);

  return (
    <SafeAreaView>
      <Stepper
        list={list}
        renderItem={(item, index) => <Text key={index}>I'm step {item}</Text>}
      />
    </SafeAreaView>
  );
};

export default StepperPage;