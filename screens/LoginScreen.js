import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image, KeyboardAvoidingView, Alert} from 'react-native';
import * as firebase from 'firebase';
import { render } from 'react-dom';

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    login = async (emailId, password)=> {
        if(emailId && password) {
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(emailId, password);
                if(response){
                    this.props.navigation.navigate('Transaction');
                }
            }
            catch(error){
                console.log(error.code);
                switch(error.code){
                    case 'auth/user-not-found': 
                        Alert.alert('User does not exist');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Incorrect User ID');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Incorrect Password')
                        break;
                }
            }          
        }
        else{
            Alert.alert('Enter User ID and Password');
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style= {{marginTop: 20, alignItems: 'center'}}>
                    <View>
                        <Image source= {require("../assets/booklogo.jpg")} style= {{width: 200, height: 200}}></Image>
                        <Text style= {{textAlign: 'center', fontSize: 30}}>Wily</Text>
                    </View>
                    <View>
                        <TextInput style= {styles.loginBox} placeholder= "abc@example.com"
                        onChangeText= {(text)=> this.setState({emailId: text})} keyboardType = 'email-address'>
                        </TextInput>
                        <TextInput style= {styles.loginBox} placeholder= "enter password"
                        onChangeText= {(text)=> this.setState({password: text})} secureTextEntry = {true}>
                        </TextInput>
                    </View>
                    <View>
                        <TouchableOpacity style= {styles.loginButton} onPress = {()=>{
                            this.login(this.state.emailId, this.state.password)}
                            }>
                            <Text style= {styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    loginButton: {
        height: 30,
        width: 90,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 7
    }
})