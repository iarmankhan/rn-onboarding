import React from 'react';
import {View, StyleSheet, Text, Image, useWindowDimensions} from 'react-native';
import {Slide} from "../types";

interface OnBoardingItemProps {
    item: Slide
}

const OnBoardingItem: React.FC<OnBoardingItemProps> = ({item}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>

            <View style={{flex: 0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 0.7, // take up 70% of available space
        justifyContent: "center"
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: "center"
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: "center",
        paddingHorizontal: 64
    }
})

export default OnBoardingItem;
