import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView} from 'react-native';
import db from '../Config';

export default class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allTransactions: [],
            lastVisibleTransaction: null,
            search: ''
        }
    }

    fetchMoreTransactions = async ()=> {
        var text = this.state.search.toUpperCase();
        var enteredText = text.split('')
        if(enteredText[0].toUpperCase() == 'B'){
            const transaction = await db.collection('transaction').startAfter(this.state.lastVisibleTransaction).limit(10).get();
            transaction.docs.map((data)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, data.data()],
                    lastVisibleTransaction: data
                });
            })
        }
        else if(enteredText[0].toUpperCase() == 'S'){
            const transaction = await db.collection('transaction').startAfter(this.state.lastVisibleTransaction).limit(10).get();
            transaction.docs.map((data)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, data.data()],
                    lastVisibleTransaction: data
                });
            })
        }
    }

    searchTransaction = async (text)=> {
        var enteredText = text.split('')
        var text = text.toUpperCase();
        if(enteredText[0].toUpperCase() == 'B'){
            const transaction = await db.collection('transaction').where('bookId', '==', text).get();
            transaction.docs.map((data)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, data.data()],
                    lastVisibleTransaction: data
                });
            })
        }
        else if(enteredText[0].toUpperCase() == 'S'){
            const transaction = await db.collection('transaction').where('studentId', '==', text).get();
            transaction.docs.map((data)=>{
                this.setState({
                    allTransactions: [...this.state.allTransactions, data.data()],
                    lastVisibleTransaction: data
                });
            })
        }
    }

    componentDidMount = async ()=> {
        const query = await db.collection('transaction').limit(10).get();
        query.docs.map((data)=>{
            this.setState({
                allTransactions: [...this.state.allTransactions, data.data()],
                lastVisibleTransaction: data
            });
        })
    }

    render(){
        return (
            <View style= {styles.container}>
                <View style= {styles.searchBar}>
                    <TextInput style= {styles.bar} placeholder = "Enter Book Id or Student Id"
                    onChangeText= {(text)=>{this.setState({search: text})}}></TextInput>
                    <TouchableOpacity style = {styles.searchButton} onPress= {()=> {
                        this.searchTransaction(this.state.search)
                    }}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data = {this.state.allTransactions} renderItem = {
                ({item})=> (
                    <View style= {{borderBottomWidth: 2}}>
                        <Text>{"book Id" + item.bookId}</Text>
                        <Text>{"student Id" + item.studentId}</Text>
                        <Text>{"transaction Type" + item.transactionType}</Text>
                        <Text>{"date" + item.date.toDate()}</Text>
                    </View>
                )                
            }
            keyExtractor = {(item, index)=> index.toString()}
            onEndReached = {this.fetchMoreTransactions}
            onEndReachedThreshold = {0.7}
            >
            </FlatList>
            </View>           
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })