import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Button} from 'react-native';
import db from '../config';
import MyHeader from '../components/header';
import firebase from 'firebase';

export default class RequestScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            title: '',
            reason: ''
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addRequest = (title, request)=>{
        var userID = this.state.userID;
        var requestId = this.createUniqueId();
        db.collection('requests').add({
            "userId": userID,
            "title": title,
            "reasonToRequest": request,
            "ID": requestId
        })
        this.setState({
            title: '',
            reason: '' 
        })
        return Alert.alert("Book Requested");
    }
    render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "Request Book"></MyHeader>
                <KeyboardAvoidingView style = {styles.keyView}>
                    <TextInput style = {styles.input} placeholder = {"enter book name"}
                    onChangeText = {(text)=>{this.setState({
                        title: text
                    })}} value = {this.state.title}></TextInput>
                    <TextInput style = {styles.input} placeholder = {"enter reason for requesting"}
                    onChangeText = {(text)=>{this.setState({
                        reason: text
                    })}} value = {this.state.reason}></TextInput>
                    <TouchableOpacity style = {styles.button} onPress = {()=>{
                        this.addRequest(this.state.title, this.state.reason)
                    }}>
                        <Text style = {styles.buttonText}>Request Book</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff9800',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
    input: {
        width: '75%',
        height: 30,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 12,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonText:{
        color: 'black',
        fontSize: 20
    }
})