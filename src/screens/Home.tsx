import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const clearOnBoarding = async () => {
        try{
            await AsyncStorage.removeItem('@viewedOnBoarding')
        }catch(err){
            console.log('Error @clearOnBoarding', err)
        }
    }
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity onPress={clearOnBoarding}>
                <Text>Clear On-Boarding</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Home;
