import React from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, ListViewComponent} from 'react-native';
import {ListItem, Card, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';

export default class MyDonations extends React.Component{
    constructor(){
        super();
        this.state={
            donerID: firebase.auth().currentUser.email,
            donerName: '',
            allDonations: []
        }
        this.requestref= null;
    }
    static navigationOptions = {header: null};
    getDonerDetails= (donerID)=>{
        db.collection('users').where("email", "==", donerID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    donerName: doc.data().firstName+" "+doc.data().lastName
                })
            })
        })
    }
    getAllDonations = ()=>{
        this.requestref = db.collection('all_donations').where("donorId", "==", this.state.donerID).onSnapshot((snapshot)=>{
            var allDonations=[];
            snapshot.docs.map((doc)=>{
                var donation = doc.data();
                donation["docId"]=doc.id;
                allDonations.push(donation)
            })
            this.setState({
                allDonations: allDonations
            })
        })
    }
    sendBook= (bookDetails)=>{
        if(bookDetails.request_status == "Book Sent"){
            var requestStatus = "Donor Interested";
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                requestStatus: "Donor Interested"
            })
            this.sendNotification(bookDetails, requestStatus)
        }else{
            var requestStatus= "Book Sent";
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                requestStatus: "Book Sent"
            })
            this.sendNotification(bookDetails, requestStatus)
        } 
    }
    sendNotification = (bookDetails, requestStatus)=>{
        var requestId = bookDetails.requestId;
        var donorID = bookDetails.donorID;
        db.collection('notifications').where("requestId", "==", requestId).where("donor", "==", donorID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = '';
                if(requestStatus=="Book Sent"){
                    message = this.state.donerName + ' has sent your book'
                }else{
                    message= this.state.donerName + ' is interested in donating'
                }
                db.collection("notifications").doc(doc.id).update({
                    message: message,
                    notificationStatus: 'unread',
                    date: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }

    keyExtractor = (item, index)=>index.toString()
    renderItem = ({item, i})=>{
        <ListItem 
        key = {i}
        title = {item.bookName}
        subtitle= {"requested by: "+ item.requestedBy+"\nStatus: "+ item.requestStatus}
        itemElement={<Icon name = "Book" type = "font-awesome" color = '#696969'></Icon>}
        titleStyle = {{color: 'black', fontWeight: 'bold'}}
        rightElement = {
            <TouchableOpacity style = {[styles.button,{backgroundColor: item.requestStatus == "Book Sent"? "green": "#ff5722"}]}
            onPress = {()=>{
                this.sendBook(item)
            }}>
                <Text style = {{color: "white"}}>{item.requestStatus == "Book Sent"? "Book Sent": "Send Book"}</Text>
            </TouchableOpacity>
        }
        bottomDivider
        >
        </ListItem>
    }
    componentDidMount(){
        this.getDonerDetails(this.state.donerID);
        this.getAllDonations();
    }
    componentWillUnmount(){
        this.requestref=null;
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader navigation = {this.props.navigation} title = "My Donations"></MyHeader>
                <View style = {{flex:1}}>
                    {this.state.allDonations.length==0?(
                        <View style = {styles.subtitle}>
                            <Text style = {{fontSize: 20}}>All Donations</Text>
                        </View>
                    ): (
                        <FlatList keyExtractor = {this.keyExtractor}
                        data = {this.state.allDonations}
                        renderItem= {this.renderItem}></FlatList>
                    )}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    subtitle: {
        flex: 1,
        justifyContent: 'center',
        fontSize: 20,
        alignItems: 'center'
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