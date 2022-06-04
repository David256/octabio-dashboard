import * as React from 'react';
import { useState } from 'react';

import { StyleSheet } from 'react-native';

import { RootTabScreenProps } from '../types';
import { View, TextInput } from 'react-native';

export default function TerminalScreen({ navigation }: RootTabScreenProps<'Terminal'>) {
  const [text, setText] = useState('');
  const [lines, setLines] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Escribe cualquier weá'}
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    padding: 10,
  }
});
