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
        const query = await db.collection('transaction').startAfter(this.state.lastVisibleTransaction).limit(10).get();
        query.docs.map((data)=>{
            this.setState({
                allTransactions: [...this.state.allTransactions, data.data()],
                lastVisibleTransaction: doc
            });
        })
    }

    componentDidMount = async ()=> {
        const query = await db.collection('transaction').limit(10).get();
        query.docs.map((data)=>{
            this.setState({
                allTransactions: [...this.state.allTransactions, data.data()],
                lastVisibleTransaction: doc
            });
        })
    }

    render(){
        return (
            <View style= {styles.container}>
                <View style= {styles.searchBar}>
                    <TextInput style= {styles.bar} placeholder = "Enter Book Id or Student Id"
                    onChangeText= {(text)=>{this.setState({search: state})}}></TextInput>
                    <TouchableOpacity style = {styles.searchButton} onPress= {()=> {
                        this.searchTransaction(this.state.search)
                    }}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
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