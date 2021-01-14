import * as React from 'react';
import {Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonateScreen from '../screens/donate';
import RequestScreen from '../screens/request';
import {AppStackNavigator} from './appStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    request : { screen: RequestScreen,
    navigationOptions: {
        tabBarIcon: 
        <Image source= {require("../assets/request-book.png")}
        style = {{
          width: 40,
          height:40
        }}></Image>,
        tabBarLabel: "Request Books"
    }},
    donate: { screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: 
            <Image source= {require("../assets/request-list.png")}
            style = {{
              width: 40,
              height:40
            }}></Image>,
            tabBarLabel: "Donate Books"
        }}
  });
