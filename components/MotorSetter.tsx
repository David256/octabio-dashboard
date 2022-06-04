import * as React from 'react';
import { useState } from 'react';

import { View, StyleSheet, TextInput, Text } from 'react-native';

export interface MotorSetterProps {
  name: string,
  value?: number,
  setValue?: (value: number) => void,
};

export function MotorSetter(props: MotorSetterProps) {
  const {
    name,
    value=0,
    setValue=() => {},
  } = props;

  const [stringValue, setStringValue] = useState(value.toString());

  const sendValue = () => {
    if (stringValue) {
      setValue(Number.parseFloat(stringValue));
      console.log('send', stringValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <TextInput
        style={styles.input}
        onBlur={() => {}}
        value={stringValue}
        onChangeText={setStringValue}
        onSubmitEditing={sendValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    minWidth: 100,
    height: 40,
    padding: 5,
    borderColor: '#000',
    borderStyle: 'solid',
  },
});
