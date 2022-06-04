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
  historySize?: number,
  colors?: string[],
};

const Graph = (props: GraphProps) => {
  const {
    a,
    b,
    legend,
    historySize=14,
    colors=['yellow', 'green'],
  } = props;
  return (
    <LineChart
      data={{
        labels: ["7th", "6th", "5th", "4th", "3th", "2th", "1th"],
        datasets: [
          { data: a.slice(-historySize), color: () => colors[0] },
          { data: b.slice(-historySize), color: () => colors[1] },
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
  const [historyLight, setHistoryLight] = useState<number[]>(initialHistory);
  const [historyCO, setHistoryCO] = useState<number[]>(initialHistory);
  const [historyDistance, setHistoryDistance] = useState<number[]>(initialHistory);
  const [historyPower, setHistoryPower] = useState<number[]>(initialHistory);
  const [historyHumidity, setHistoryHumidity] = useState<number[]>(initialHistory);

  const api = useAPI();

  const [distance, setDistance] = useState(api.getApiValue('distance'));
  const [co, setCo] = useState(api.getApiValue('co'));
  const [power, setPower] = useState(api.getApiValue('power'));
  const [light, setLight] = useState(api.getApiValue('light'));
  const [humidity, setHumidity] = useState(api.getApiValue('humdity'));

  const updateValues = () => {
    setDistance(api.getApiValue('distance'));
    setCo(api.getApiValue('co'));
    setPower(api.getApiValue('power'));
    setLight(api.getApiValue('light'));
    setHumidity(api.getApiValue('humidity'));
  };

  useEffect(() => {
    setHistoryLight((last) => [...last, light as number]);
    setHistoryCO((last) => [...last, co as number]);
    setHistoryDistance((last) => [...last, distance as number]);
    setHistoryPower((last) => [...last, power as number]);
    setHistoryHumidity((last) => [...last, humidity as number]);
  }, [light]);

  useEffect(() => {
    setInterval(() => {
      updateValues();      
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Graph</Text>
      <Separator />

      <ScrollView style={styles.scrollable}>
        <Text>Distance vs CO</Text>
        <Graph a={historyDistance} b={historyCO} legend={['distance', 'CO']} colors={['green', 'red']} />
        <Separator />

        <Text>Power vs Light</Text>
        <Graph a={historyPower} b={historyLight} legend={['power', 'light']} colors={['orange', 'yellow']} />
        <Separator />

        <Text>Humidity vs CO</Text>
        <Graph a={historyHumidity} b={historyCO} legend={['Humedad', 'CO']} colors={['blue', 'red']} />
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
