import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View, ViewToken} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {SLIDES} from "../data/slides";
import OnBoardingItem from "../components/OnBoardingItem";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";

interface OnBoardingProps {

}

const OnBoarding: React.FC<OnBoardingProps> = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<any>(null)

    const viewableItemsChanged = useRef(({viewableItems}: { viewableItems: ViewToken[] }) => {
        setCurrentIndex(viewableItems[0].index as any)
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

    const scrollTo = async () => {
        if (currentIndex < SLIDES.length - 1) {
            slidesRef?.current?.scrollToIndex({index: currentIndex + 1})
        } else {
            try {
                await AsyncStorage.setItem('@viewedOnBoarding', 'true')
            } catch (err) {
                console.log('Error @setItem', err)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <Animated.FlatList
                    data={SLIDES}
                    renderItem={({item}) => <OnBoardingItem item={item} key={item.id}/>}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    pagingEnabled
                    onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {x: scrollX}}
                    }], {useNativeDriver: false})}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={SLIDES} scrollX={scrollX}/>
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / SLIDES.length)}/>
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
