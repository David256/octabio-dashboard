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
import useSimulation, { useKaoticSimulation, useSmartSimulation } from '../hooks/useSimulation';

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

      width={Dimensions.get("window").width - 10} // from react-native
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
  const simulation = useSimulation();
  const kaoticSimulation = useKaoticSimulation();
  const smartSimulation = useSmartSimulation();

  const [historyLight, setHistoryLight] = useState<number[]>(initialHistory);
  const [historyCO, setHistoryCO] = useState<number[]>(initialHistory);
  const [historyDistance, setHistoryDistance] = useState<number[]>(initialHistory);
  const [historyPower, setHistoryPower] = useState<number[]>(initialHistory);
  const [historyHumidity, setHistoryHumidity] = useState<number[]>(initialHistory);

  // const [aLight, setALight] = useState(Number.parseFloat(api.data.light as string));
  // const [aCO, setACO] = useState(Number.parseFloat(api.data.co as string));
  // const [aDistance, setADistance] = useState(Number.parseFloat(api.data.distance as string));
  // const [aPower, setAPower] = useState(Number.parseFloat(api.data.power as string));
  // const [aHumidity, setAHumidity] = useState(Number.parseFloat(api.data.humidity as string));


  const update = () => {
    // setHistoryLight((last) => [...last, aLight]);
    // setHistoryCO((last) => [...last, aCO]);
    // setHistoryDistance((last) => [...last, aDistance]);
    // setHistoryPower((last) => [...last, aPower]);
    // setHistoryHumidity((last) => [...last, aHumidity]);

    // setHistoryLight((last) => [...last, Number.parseFloat(api.data.light as string)]);
    // setHistoryCO((last) => [...last, Number.parseFloat(api.data.co as string)]);
    // setHistoryDistance((last) => [...last, Number.parseFloat(api.data.distance as string)]);
    // setHistoryPower((last) => [...last, Number.parseFloat(api.data.power as string)]);
    // setHistoryHumidity((last) => [...last, Number.parseFloat(api.data.humidity as string)]);

    setHistoryLight((last) => [...last, simulation()]);
    setHistoryCO((last) => [...last, smartSimulation(last.slice(-1)[0])]);
    setHistoryDistance((last) => [...last, kaoticSimulation(last.slice(-1)[0])]);
    setHistoryPower((last) => [...last, kaoticSimulation(last.slice(-1)[0])]);
    setHistoryHumidity((last) => [...last, smartSimulation(last.slice(-1)[0])]);

    // console.log(Number.parseFloat(api.data.distance as string));

    setTimeout(() => update(), 1000);
  }

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    // Check big list
    // if (historyLight.length > 7) setHistoryLight(historyLight.slice(0, 7));
    // if (historyCO.length > 7) setHistoryCO(historyCO.slice(0, 7));
    // if (historyDistance.length > 7) setHistoryDistance(historyDistance.slice(0, 7));
    // if (historyPower.length > 7) setHistoryPower(historyPower.slice(0, 7));
    // if (historyHumidity.length > 7) setHistoryHumidity(historyHumidity.slice(0, 7));
    // console.log('update slicing');
  }, [
    historyLight, historyCO, historyDistance, historyPower, historyHumidity,
    setHistoryLight, setHistoryCO, setHistoryDistance, setHistoryPower, setHistoryHumidity,
  ]);

  useEffect(() => {
    // setALight(Number.parseFloat(api.data.light as string))
    // setACO(Number.parseFloat(api.data.co as string))
    // setADistance(Number.parseFloat(api.data.distance as string))
    // setAPower(Number.parseFloat(api.data.power as string))
    // setAHumidity(Number.parseFloat(api.data.humidity as string))
    // console.log('update inputs');
  }, [api.data.light,
      api.data.co,
      api.data.distance,
      api.data.power,
      api.data.humidity]);

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
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  scrollable: {
    padding: 5,
    height: '100%',
  }
});
