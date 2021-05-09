import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg'
import {AntDesign} from "@expo/vector-icons";

interface NextButtonProps {
    percentage: number;
}

const NextButton: React.FC<NextButtonProps> = ({percentage}) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);

    const animation = (toValue: number) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        animation(percentage)
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener(
            (value) => {
                const strokeDashoffset = circumference - (circumference * value.value) / 100;
                if (progressRef?.current) {
                    progressRef?.current?.setNativeProps({
                        strokeDashoffset
                    })
                }
            }
        );

        return () => {
            progressAnimation.removeAllListeners()
        }
    }, [percentage])

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
                        ref={progressRef}
                        stroke='#f4338f'
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
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
