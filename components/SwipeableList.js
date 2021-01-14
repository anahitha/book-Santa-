import React from 'react';
import {Dimensions, Animated, Text, StyleSheet, TouchableHighlight, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { notifications } from 'react-native-firebase';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications,
        }
    }
    updateMarkAsRead = (notifications)=>{
        db.collection('notifications').doc(notifications.doc_id).update({
            notificationStatus: "read"
        })
    }
    onSwipeValueChange = swipeData=>{
        var allNotifications = this.state.allNotifications;
        const {key, value}= swipeData;
        if(value < -Dimensions.get('window').width){
            const newData = [...allNotifications];
            const prevIndex = allNotifications.findIndex(item=>item.key==key);
            this.updateMarkAsRead(allNotifications[prevIndex]);
            newData.splice(prevIndex, 1);
            this.setState({
                allNotifications: newData
            })
        }
    }
    renderItem = data=>(
        <Animated.View>
            <ListItem 
            leftElement = {<Icon name = 'book' type = 'font-awesome' color = '#696969'>
            </Icon>} title = {item.bookName} titleStyle = {{color: 'black', fontWeight: 'bold'}}
            subtitle = {data.item.message} bottomDivider></ListItem>
        </Animated.View>
    )
    renderHiddenItem = ()=>{
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style = {styles.backTextWhite}></Text>
            </View>
        </View>
    }
    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView disableRightSwipe data= {this.state.allNotifications}
                renderItem = {this.renderItem} renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width} previewRowKey = {'0'} 
                previewOpenValue = {-40} previewOpenDelay = {30000} onSwipeValueChange = {this.onSwipeValueChange()}>

                </SwipeListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});