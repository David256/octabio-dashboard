import React from "react";
import {Text} from './Themed';
import * as Progress from 'react-native-progress';
import {View, StyleSheet} from 'react-native'


export default function SensorStats(props){
    const {title, percentage} = props;
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.labelText}>{title}</Text>
                <Progress.Bar height={15} progress={percentage} width={300} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText:{
        paddingTop:40,
        fontSize:20
    }
});