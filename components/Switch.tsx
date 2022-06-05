import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { colorGray, colorGreen } from '../constants/Colors';

export interface SwitchProps {
  left: string,
  right: string,
  value?: boolean,
  setValue?: (value: boolean) => void,
};

export function Switch(props: SwitchProps) {
  const {
    left,
    right,
    value=false,
    setValue=() => {},
  } = props;

  const [modo, setModo] = useState(value);

  const onToggle = () => {
    setModo(!modo);
  }

  const getColorStyle = (wanted: boolean) => {
    if (wanted === modo) return { backgroundColor: colorGreen }
    return { backgroundColor: colorGray };
  };

  useEffect(() => {
    setValue(modo);
  }, [modo]);

  return (
    <Pressable onPress={onToggle}>
      <View style={styles.container}>
        <View style={[styles.left, getColorStyle(false)]}><Text>{left}</Text></View>
        <View style={[styles.right, getColorStyle(true)]}><Text>{right}</Text></View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 24,
  },
  left: {
    width: '50%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
  },
  right: {
    width: '50%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
  },
});
