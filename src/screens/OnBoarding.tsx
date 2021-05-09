import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View, ViewToken} from 'react-native';
import {SLIDES} from "../data/slides";
import OnBoardingItem from "../components/OnBoardingItem";
import Paginator from "../components/Paginator";

interface OnBoardingProps {

}

const OnBoarding: React.FC<OnBoardingProps> = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({viewableItems}: { viewableItems: ViewToken[] }) => {
        setCurrentIndex(viewableItems[0].index as any)
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

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
