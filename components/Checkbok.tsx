import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from './Themed';

export interface CheckboxProps {
  children?: React.ReactNode,
  value?: boolean,
  onCheck?: (isChecked: boolean) => void,
};

export default function Checkbox(props: CheckboxProps) {
  const {
    children='',
    value=false,
    onCheck=() => {},
  } = props;

  const [isChecked, setIsChecked] = useState(value);

  const onPress = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  useEffect(() => {
    onCheck(isChecked);
  }, [isChecked]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.checkboxContainer}>
        <View
          style={[
            styles.checkbox,
            (isChecked ? styles.isChecked: styles.isNotChecked),
          ]}
        />
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    marginBottom: 5,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 5,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  isChecked: {
    backgroundColor: '#0f0',
  },
  isNotChecked: {
    backgroundColor: '#fff',
  }
});
