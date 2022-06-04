import { View } from "react-native";
import LedControl from "./LedControl";

export default function LedControls() {
  return (
    <View>
      <LedControl id={0} />
      <LedControl id={1} />
    </View>
  );
}
