import { View, StyleSheet } from "react-native";
import LedControl from "./LedControl";

export default function LedControls() {
  return (
    <View style={styles.container}>
      <LedControl id={1} />
      <LedControl id={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
