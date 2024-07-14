import { useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native';

type PropsType<T> = {
  list: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  disabledSubmit?: boolean;
  disabledNext?: boolean;
};

const Stepper = <T,>({ list = [], onPrevious, onNext, onSubmit, renderItem, disabledSubmit = false, disabledNext = false }: PropsType<T>) => {
  const [cursor, setCursor] = useState<number>(0);

  const handlePrevious = useCallback(() => {
    setCursor((prev) => prev - 1);
    onPrevious?.();
  }, [onPrevious]);

  const handleNext = useCallback(() => {
    setCursor((prev) => prev + 1);
    onNext?.();
  }, [onNext]);

  return (
    <View>
      <View>
        <View>
          <Text>{`${cursor + 1}/${list.length}`}</Text>
          {renderItem(list[cursor], cursor)}
        </View>
      </View>

      <View style={{ justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
        {cursor >= list.length - 1 ?
          <Button title='Submit' onPress={onSubmit} disabled={disabledSubmit} />
          :
          <Button title='Next' onPress={handleNext} disabled={disabledNext} />}
        {cursor > 0 && <Button title='Previous' onPress={handlePrevious} />}
      </View>
    </View>
  );
};

export default Stepper;