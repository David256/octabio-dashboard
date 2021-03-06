import * as React from 'react';
import { useState, useEffect } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Colors from '../constants/Colors';

import useLedControl from '../hooks/useLedControl';
import { LedStateType } from '../providers/LedControlProvider';

import useAPI from '../hooks/useAPI';
import useGlobalSettings from '../hooks/useGlobalSettings';
import useColorScheme from '../hooks/useColorScheme';

export interface LedControlProps {
  id: number,
};

function LedControl(props: LedControlProps) {
  const {globalSettings, updateGlobalSettings} = useGlobalSettings();
  const { id } = props;
  const colorScheme = useColorScheme();

  const {leds, updateLed} = useLedControl();
  const [ledState, setLedState] = useState<LedStateType>(
    globalSettings[`led${id}` as keyof typeof globalSettings] ? 'on' : 'off'
  );

  const { sendApiValue } = useAPI();

  const onPress = () => {
    // Change the led state
    if (leds[id] === 'on') {
      setLedState('off');
      // sendApiValue(`led${id}`, 'off');
    } else {
      setLedState('on');
      // sendApiValue(`led${id}`, 'on');
    }
  };

  useEffect(() => {
    updateLed(id, ledState);
    console.log(`change led #${id} to '${ledState}'`);
    sendApiValue(`led${id}`, ledState);

    updateGlobalSettings(`led${id}`, ledState);
  }, [ledState]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <FontAwesome
        name="lightbulb-o"
        size={25}
        color={Colors[colorScheme].led[ledState]}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}

export default LedControl;