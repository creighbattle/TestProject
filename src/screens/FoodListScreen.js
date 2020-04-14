import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, SafeAreaView, Image } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { addFood, getFoods } from '../api/FoodsApi';

import ImagePicker from 'react-native-image-picker';

class FoodListScreen extends Component {
    colors = ['red', 'black', 'blue', 'green', 'orange', 'yellow', 'purple', 'white', 'brown']

    state = {
        foodList: [],
        currentFoodItem: null,
        photo: null,
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response });
            }
        });
    };

    onFoodAdded = (food) => {
        this.setState(prevState => ({
            foodList: [...prevState.foodList, food]
        }));
    }

    onFoodsReceived = (foodList) => {
        console.log(foodList);
        this.setState(prevState => ({
            foodList: prevState.foodList = foodList
        }));
    }

    componentDidMount() {
        getFoods(this.onFoodsReceived)
    }

    render() {
        const { photo } = this.state;
        return (
            <SafeAreaView style={styles.container}>

                <TextInput
                    style={styles.input}
                    placeholder="Add Food"
                    placeholderTextColor='black'
                    value={this.state.currentFoodItem}
                    onChangeText={(text) => this.setState(prevState => ({
                        currentFoodItem: prevState.currentFoodItem = text
                    }))}
                />

                <Button
                    title="Submit"
                    style={styles.button}
                    onPress={() =>
                        addFood(
                            {
                                name: this.state.currentFoodItem,
                                color: this.colors[Math.floor(Math.random() * this.colors.length)]
                            },
                            this.onFoodAdded
                        )
                    }
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                    )}
                    <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                </View>
                <FlatList
                    data={this.state.foodList}
                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        console.log(item);
                        return (
                            <ListItem
                                title={item.name}
                                subtitle={item.color}
                                onPress={() => { }}
                            />
                        )
                    }}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    input: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: 'blue'
    },
});

export default FoodListScreen;