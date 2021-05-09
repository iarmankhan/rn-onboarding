import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnBoarding from "./src/screens/OnBoarding";
import Home from "./src/screens/Home";

const Loading = () => {
    return (
        <View>
            <ActivityIndicator size='large' color='#493d8a' />
        </View>
    )
}

export default function App() {
    const [loading, setLoading] = useState(true);
    const [viewedOnBoarding, setViewedOnBoarding] = useState(false);

    const checkOnBoarding = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewedOnBoarding')

            if (value !== null) {
                setViewedOnBoarding(true)
            }
        } catch (err) {
            console.log('Error @checkOnBoarding: ', err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkOnBoarding().then()
    }, [])

    return (
        <View style={styles.container}>
            {loading ? <Loading/> : viewedOnBoarding ? <Home/> : <OnBoarding/>}
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
