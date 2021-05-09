import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg'
import {AntDesign} from "@expo/vector-icons";

interface NextButtonProps {

}

const NextButton: React.FC<NextButtonProps> = () => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G rotation='-90' origin={center}>
                    {/* circle under the progress bar */}
                    <Circle
                        stroke='#e6e7e8'
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    {/* progress bar */}
                    <Circle
                        stroke='#f4338f'
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * 25) / 100}
                    />
                </G>
            </Svg>
            <TouchableOpacity style={styles.button} activeOpacity={.6}>
                <AntDesign name="arrowright" size={32} color='#fff'/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: '#f43385',
        padding: 20
    }
})

export default NextButton;
