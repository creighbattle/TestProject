import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, SafeAreaView, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import FoodListScreen from './src/screens/FoodListScreen';

const AppStack = createStackNavigator({
    FoodList: FoodListScreen,
});

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
    {
        initialRouteName: 'App',
    }
));

class App extends Component {

    render() {
        return (
            <AppContainer
                screenProps={{ appName: 'TestProject' }}
            />
        )
    }
}


export default App;
