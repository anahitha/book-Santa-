import * as React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import SantaAnimation from '../components/santaAnimation';

export default class Welcome extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            address: '',
            firstName: '',
            lastName: '',
            contact: '',
            confirmPassword: '',
            isModalVisible: false
        }
    }
    login = (email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            this.props.navigation.navigate('donate')
        })
        .catch((error)=>{
            var errorcode = error.code;
            var errorM = error.message
            return alert(errorM)
        })
    }
    
    signUp = (email, password, confirmPassword)=>{
        if(password != confirmPassword){
            return Alert.alert("Passwords don't match")
        }else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection('users').add({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    contact: this.state.contact,
                    email: this.state.email,
                    address: this.state.address
                })
                return Alert.alert('User addded successfully', '', [{text: 'Okay', onPress: ()=>
                    this.setState({isModalVisible: false})}])
            }) 
            .catch((error)=>{
                var errorcode = error.code;
                var errorM = error.message
                return alert(errorM)
            })
        }
    }
    showModal = ()=>{
        return (
            <Modal animationType = "fade" transparent= {false} visible = {this.state.isModalVisible}>
                <View>
                    <ScrollView style = {{width: '100%'}}>
                        <KeyboardAvoidingView >
                            <Text style = {styles.modaltitle}>Registration</Text>
                            <TextInput style = {styles.textinput} placeholder = {"first name"}
                            maxLength = {8} onChangeText = {(text)=>{
                                this.setState({
                                    firstName: text
                                })
                            }}>
                            </TextInput>
                            <TextInput style = {styles.textinput} placeholder = {"last name"}
                            maxLength = {8} onChangeText = {(text)=>{
                                this.setState({
                                    lastName: text
                                })
                            }}>
                            </TextInput>
                            <TextInput style = {styles.textinput} placeholder = {"address"}
                            multiline = {true} onChangeText = {(text)=>{
                                this.setState({
                                    address: text
                                })
                            }}>
                            </TextInput>
                            <TextInput style = {styles.textinput} placeholder = {"contact"}
                            maxLength = {10} keyboardType= {'numeric'} onChangeText = {(text)=>{
                                this.setState({
                                    contact: text
                                })
                            }}>
                            </TextInput>
                            <TextInput style = {styles.textinput} placeholder = {'email'}
                            keyboardType = {'email-address'} onChangeText = {(text)=>{
                                this.setState({
                                    email: text
                                })
                            }}>
                            </TextInput>
                            
                            <TextInput style = {styles.textinput} placeholder = {"password"}
                            secureTextEntry = {true} onChangeText = {(text)=>{
                                this.setState({
                                    password: text
                                })
                            }}>
                            </TextInput>
                            <TextInput style = {styles.textinput} placeholder = {"confirm password"}
                            secureTextEntry = {true} onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword: text
                                })
                            }}>
                            </TextInput>
                            <View>
                                <TouchableOpacity style = {styles.register} onPress = {()=>{
                                    this.signUp(this.state.email, this.state.password, this.state.confirmPassword)
                                }}>
                                    <Text style = {styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style = {styles.register} onPress = {()=>this.setState({isModalVisible: false})}>
                                    <Text style = {styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.profileContainer}>
                    <View>
                        {this.showModal()}
                    </View>
                    <View>
                    <Text style = {styles.title}>Book Santa</Text>
                </View>
                </View>
                <View style = {styles.profileContainer}>
                    <TextInput style = {styles.loginBox} 
                    placeholder = "example@email.com" 
                    placeholderTextColor = "black"
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({
                            email: text
                        })
                    }}></TextInput>
                    <TextInput style = {styles.loginBox} 
                    placeholder = "pasword" 
                    placeholderTextColor = "black"
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            password: text
                        })
                    }}></TextInput>
                    <TouchableOpacity style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress = {()=>{this.login(this.state.email, this.state.password)}}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress = {()=>this.setState({isModalVisible: true})}>
                        <Text style = {styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8be85',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 45,
        paddingBottom: 30,
        color: '#ff3d00',

    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
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
        elevation: 16
    },
    buttonText:{
        color: 'black',
        fontSize: 20
    },
    keyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modaltitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color:'#ff5722',
        margin: 50
    },
    modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 80,
        marginBottom: 80
    },
    textinput: {
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
    register: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 30,
        marginTop: 5
    }

})