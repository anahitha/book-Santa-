import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReceiverDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            userName: '',
            receiverId: this.props.navigation.getParam('details')["userId"],
            requestId: this.props.navigation.getParam('details')["ID"],
            bookName: this.props.navigation.getParam('details')["title"],
            reason: this.props.navigation.getParam('details')["reasonToRequest"],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId: ''
        }
        console.log("printing user id")
        console.log(this.state.userId)
    }   
    getReceiverDetails = ()=>{
        db.collection('users').where('email', '==', this.state.receiverId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiverName: doc.data().firstName,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address
                })
            })
        });
        db.collection('requests').where('ID', '==', this.state.requestId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiverRequestDocId: doc.id
                })
            })
        })
    }
    getUserDetails = (userId)=>{
        db.collection('users').where('email', '==', this.state.userId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    userName: doc.data().firstName + ' '+ doc.data().lastName
                })
            })
        })    
    }
    updateBookStatus = ()=>{
        db.collection('all_donations').add({
            bookName: this.state.bookName,
            requestId: this.state.requestId,
            requestedBy: this.state.receiverName,
            donorId: this.state.userId,
            requestStatus: "Donor Interested"
        })
    };
    addNotification = ()=>{
        var message =this.state.userName + " is interested in donating"
        db.collection('notifications').add({
            targetUserId: this.state.receiverId,
            donor: this.state.userId,
            requestId: this.state.requestId,
            bookName: this.state.bookName,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            notificationStatus: 'unread',
            message: message
        })
    }
    componentDidMount(){
        this.getReceiverDetails();
        this.getUserDetails(this.state.userId);
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex: 0.1}}>
                    <Header 
                        leftComponent = {<Icon name = 'arrow-left' type= 'feather' color = '#696969' onPress= {()=>this.props.navigation.goBack()}></Icon>}
                        centerComponent={{text: 'Donate Books', style: {color: '#90a5a9', fontSize: 20, fontWeight: 'bold'}}}
                        backgroundColor = 'eaf8fe'
                    ></Header>
                </View>
                <View style = {{flex: 0.3}}>
                    <Card title= {"Book Info"} textStyle= {{fontSize: 20}}>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Name: {this.state.bookName}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Reason to Request: {this.state.reason}</Text>
                        </Card>
                    </Card>
                </View>
                <View style = {{flex: 0.3}}>
                    <Card title= {"Receiver Info"} textStyle= {{fontSize: 20}}>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Name: {this.state.receiverName}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Contact: {this.state.receiverContact}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Address: {this.state.receiverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style= {styles.buttonCont}>
                    {this.state.receiverId!=this.state.userId?(
                        <TouchableOpacity style = {styles.button} onPress = {()=>{
                            this.updateBookStatus();
                            this.addNotification();
                            this.props.navigation.navigate('MyDonations')
                        }}>
                            <Text>I want to donate</Text>
                        </TouchableOpacity>
                    ):null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    buttonCont: {
        flex: 0.3,
        justifyContent: 'center'
    },
    button: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: '#000',
        shadowOffset:{width: 0, height: 8},
        elevation: 16
    }
})