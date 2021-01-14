import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import DonateScreen from '../screens/donate';
import ReceiverDetails from '../screens/reciever';

export const AppStackNavigator = createStackNavigator({
    Donate: {screen: DonateScreen, 
    navigationOptions: {headerShown: false}},
    ReceiverDetails: {screen: ReceiverDetails,
    navigationOptions: {headerShown: false}}
},{

    initialRouteName: 'Donate'
})