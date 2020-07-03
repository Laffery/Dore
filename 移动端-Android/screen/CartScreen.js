import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { SearchBar } from '../component/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {apiUrl} from '../urlconfig';
import AsyncStorage from '@react-native-community/async-storage';

const GET_CARTS_URL=apiUrl+"/cart/getByUid?uid=";
let uid = 0;

export class CartScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            carts: [],
            isLoading: true,
        }
    }

    fetchData() {
        let _get_uid_ = async () => {
            try {
                uid = await AsyncStorage.getItem('@Dore:id');
                axios.get(GET_CARTS_URL + uid).then((resp) => {
                    this.setState({
                        isLoading:false,
                        carts: resp.data
                    });
                });
            }
            catch (e) {}
        }
        _get_uid_().then();
    }

    renderCart=({item})=>{
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <Image
                        source={{uri: item.book.detail.iconBase64}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.book.title}</Text>
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
                    cancelSearching={()=>this.cancel()}/>
                <FlatList
                    data={this.state.carts}
                    renderItem={this.renderCart}
                    style={styles.list}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize:12,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },price: {
        fontSize: 14,
        marginRight: 10
    },
    image: {
        width: 50,
        height: 80,
        marginLeft: 10
    },
    list: {
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#F5FCFF',
    },
});
