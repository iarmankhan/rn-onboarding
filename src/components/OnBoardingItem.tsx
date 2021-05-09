import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Slide} from "../types";

interface OnBoardingItemProps {
    item: Slide
}

const OnBoardingItem: React.FC<OnBoardingItemProps> = ({item}) => {
    return (
        <View style={styles.container}>
            <Text>OnBoardingItem</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
})

export default OnBoardingItem;
