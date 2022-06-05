import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInputSubmitEditingEventData } from 'react-native';

import { RootTabScreenProps } from '../types';
import { View, TextInput } from 'react-native';
import Colors, { colorPrimary } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import Checkbox from '../components/Checkbok';
import useGlobalSettings from '../hooks/useGlobalSettings';
import useAPI from '../hooks/useAPI';

export default function TerminalScreen({ navigation }: RootTabScreenProps<'Terminal'>) {
  const colorScheme = useColorScheme();
  const api = useAPI();

  const {globalSettings, updateGlobalSettings} = useGlobalSettings();

  const [incommingText, setIncommingText] = useState<string | null>(null);
  const [enableReceiveLog, setEnableReceiveLog] = useState(false);
  const [text, setText] = useState('');
  const [lines, setLines] = useState<string[]>([]);

  const updateValues = () => {
    const value = api.getApiValue('log') as string
    setIncommingText(value);
    console.log('!!', value);
  };

  useEffect(() => {
    console.log(enableReceiveLog)
    if (enableReceiveLog && incommingText) {
      setLines((last) => [...last, ...incommingText.split('\n').map((text) => `>> ${text}`)]);
      setIncommingText(null);
    }
  }, [incommingText, enableReceiveLog]);

  useEffect(() => {
    setInterval(() => {
      updateValues();      
    }, 1000);
  }, []);

  const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const sentText: string = e.nativeEvent.text;

    api.sendApiValue('text', sentText);
    setLines((last) => [...last, '<< '+sentText]);
    setText('');
  }
  
  const onCheck = (isChecked: boolean) => {
    setEnableReceiveLog(isChecked);
    updateGlobalSettings('enableLog', isChecked);
  }

  return (
    <View style={styles.container}>
      <View style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 32,
      }}>
        <Checkbox
          value={globalSettings.enableLog}
          onCheck={onCheck}
        >
          Recibir mensajes
        </Checkbox>
        <Button
          title="Limpiar"
          color={colorPrimary}
          onPress={() => setLines([])}
        />
      </View>
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
