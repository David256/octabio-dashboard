import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Themed';

export default function Separator() {
  return (
    <View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
});
