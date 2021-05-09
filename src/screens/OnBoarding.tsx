import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SLIDES} from "../data/slides";
import OnBoardingItem from "../components/OnBoardingItem";

interface OnBoardingProps {

}

const OnBoarding: React.FC<OnBoardingProps> = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={SLIDES}
                renderItem={({item}) => <OnBoardingItem item={item} key={item.id}/>}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                pagingEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OnBoarding;
