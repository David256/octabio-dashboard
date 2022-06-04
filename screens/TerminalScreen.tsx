import * as React from 'react';
import { useState } from 'react';

import { NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInputSubmitEditingEventData } from 'react-native';

import { RootTabScreenProps } from '../types';
import { View, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function TerminalScreen({ navigation }: RootTabScreenProps<'Terminal'>) {
  const colorScheme = useColorScheme();

  const [text, setText] = useState('');
  const [lines, setLines] = useState<string[]>([]);

  const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const sentText: string = e.nativeEvent.text;
    setLines((last) => [...last, sentText]);
    setText('');
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator
      >
        <Text style={styles.text}>
          {lines.map((line) => `${line}\n`)}
        </Text>
      </ScrollView>
      <TextInput
        autoFocus
        value={text}
        onChangeText={setText}
        style={[styles.input, {color: Colors[colorScheme].textInput}]}
        onSubmitEditing={onSubmit}
        placeholder={'Escribe cualquier weá'}
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
  },
  scrollable: {
    backgroundColor: '#212121',
    padding: 5,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
  }
});
