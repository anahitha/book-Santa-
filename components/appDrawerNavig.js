import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './appTabNavigator';
import CustomMenu from './CustomMenu';
import Settings from '../screens/update';
import MyDonations from '../screens/myDonations';
import NotificationScreen from '../screens/notification'


export const AppDrawerNavigator = createDrawerNavigator({
    Home: {screen: AppTabNavigator},
    Settings: {screen: Settings},
    MyDonations: {screen: MyDonations},
    Notifications: {screen: NotificationScreen}
},{
    contentComponent: CustomMenu
},{
    initialRouteName: 'Home'
}
)