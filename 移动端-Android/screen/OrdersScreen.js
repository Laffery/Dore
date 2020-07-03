import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { SearchBar } from '../component/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {apiUrl} from '../urlconfig';
import AsyncStorage from '@react-native-community/async-storage';

const GET_ORDERS_URL=apiUrl+"/order/getByID?id=";
let uid = 0;

export class OrdersScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            order: [],
            isLoading: true,
        }
    }

    fetchData() {
        let _get_uid_ = async () => {
            try {
                uid = await AsyncStorage.getItem('@Dore:id');
                console.log(GET_ORDERS_URL + uid);
                axios.get(GET_ORDERS_URL + uid).then((resp) => {
                    this.setState({
                        isLoading:false,
                        orders: resp.data
                    })
                    console.log(resp.data);
                });
            }
            catch (e) {}
        }
        _get_uid_().then();
    }

    navigateToDetail({item}){
        this.props.navigation.push("Order",{detail:item});
    }

    renderOrder=({item})=>{
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.id}>{item.id}</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <View >
                        <Text style={styles.price}>¥{item.price}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render(){
        this.fetchData();

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 2}}>
                <SearchBar
                    searchBooks={(data) => this.getText(data)}
                    cancelSearching={()=> this.cancel()}
                />
                <FlatList
                    data={this.state.orders}
                    renderItem={this.renderOrder}
                    style={styles.list}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: "#F5FCFF",
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        height: 40
    },
    id: {
        width: 50,
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    date: {
        width: 280,
        fontSize: 14,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
    },
    list: {
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#F5FCFF',
    },
});
