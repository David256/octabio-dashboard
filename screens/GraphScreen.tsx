import { StyleSheet, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';
import Separator from '../components/Separator';
import useAPI from '../hooks/useAPI';
import { useEffect, useState } from 'react';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const initialHistory = [0, 0, 0, 0, 0, 0, 0, 0];

interface GraphProps {
  a: number[],
  b: number[],
  legend: string[],
  colors?: string[],
};

const Graph = (props: GraphProps) => {
  const {
    a,
    b,
    legend,
    colors=['yellow', 'green'],
  } = props;
  return (
    <LineChart
      data={{
        labels: ["7th", "6th", "5th", "4th", "3th", "2th", "1th"],
        datasets: [
          { data: a, color: () => colors[0] },
          { data: b, color: () => colors[1] },
        ],
        legend,
      }}

      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 5
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

export default function GraphScreen() {
  const api = useAPI();

  const [historyLight, setHistoryLight] = useState<number[]>(initialHistory);
  const [historyCO, setHistoryCO] = useState<number[]>(initialHistory);
  const [historyDistance, setHistoryDistance] = useState<number[]>(initialHistory);
  const [historyPower, setHistoryPower] = useState<number[]>(initialHistory);
  const [historyHumidity, setHistoryHumidity] = useState<number[]>(initialHistory);

  const [aLight, setALight] = useState(Number.parseFloat(api.data.light as string));
  const [aCO, setACO] = useState(Number.parseFloat(api.data.co as string));
  const [aDistance, setADistance] = useState(Number.parseFloat(api.data.distance as string));
  const [aPower, setAPower] = useState(Number.parseFloat(api.data.power as string));
  const [aHumidity, setAHumidity] = useState(Number.parseFloat(api.data.humidity as string));


  const update = () => {
    setHistoryLight((last) => [...last, aLight]);
    setHistoryCO((last) => [...last, aCO]);
    setHistoryDistance((last) => [...last, aDistance]);
    setHistoryPower((last) => [...last, aPower]);
    setHistoryHumidity((last) => [...last, aHumidity]);

    // Check big list
    if (historyLight.length > 7) historyLight.splice(0, 1);
    if (historyCO.length > 7) historyCO.splice(0, 1);
    if (historyDistance.length > 7) historyDistance.splice(0, 1);
    if (historyPower.length > 7) historyPower.splice(0, 1);
    if (historyHumidity.length > 7) historyHumidity.splice(0, 1);

    setALight(Number.parseFloat(api.getApiValue('light') as string))
    setACO(Number.parseFloat(api.getApiValue('co') as string))
    setADistance(Number.parseFloat(api.getApiValue('distance') as string))
    setAPower(Number.parseFloat(api.getApiValue('power') as string))
    setAHumidity(Number.parseFloat(api.getApiValue('humidity') as string))

    setTimeout(() => update(), 1000);
  }

  // useEffect(() => {
  //   update();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Graph</Text>
      <Separator />

      <ScrollView style={styles.scrollable}>
        <Text>Distance vs CO</Text>
        <Graph a={historyDistance.slice(-14)} b={historyCO.slice(-14)} legend={['distance', 'CO']} colors={['green', 'red']} />
        <Separator />

        <Text>Power vs Light</Text>
        <Graph a={historyPower.slice(-14)} b={historyLight.slice(-14)} legend={['power', 'light']} colors={['purple', 'yellow']} />
        <Separator />

        <Text>Humidity vs CO</Text>
        <Graph a={historyHumidity.slice(-14)} b={historyCO.slice(-14)} legend={['Humedad', 'CO']} colors={['blue', 'red']} />
        <Separator />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  scrollable: {
    height: '100%',
  }
});
