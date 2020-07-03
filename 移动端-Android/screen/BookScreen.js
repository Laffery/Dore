import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {apiUrl} from "../urlconfig";
import axios from 'axios';
import {SafeAreaView} from 'react-navigation';

const CART_URL=apiUrl+"/cart/save";
const ORDER_URL=apiUrl+"/order/save";
let uid = 0;
let detail = {};
let count = 1;

export class BookScreen extends React.Component {
    fetchData() {
        uid = 0;
        count = 1;
        detail = this.props.route.params.detail;
        let _get_uid_ = async () => {
            try {
                uid = await AsyncStorage.getItem('@Dore:id');
            }
            catch (e) {}
        }

        _get_uid_().then();
    }

    cart() {
        axios.post(CART_URL, {
            user: { id: uid },
            book: detail,
            count: count,
            price: count * detail.price
        }).then(() => {
            Alert.alert('添加' + count + '本《' + detail.title + '》到购物车成功！');
            this.props.navigation.pop();
        });
    };

    buy() {
        axios.post(ORDER_URL, {
            user: { id: uid },
            items: [{
                book: detail,
                count: count,
                price: count * detail.price
            }]
        }).then((res) =>{
            if (res.data === 'success') {
                Alert.alert('购买' + count + '本《' + detail.title + '》成功！');
                this.props.navigation.pop();
            }
            else {
                Alert.alert('购买失败！');
            }
        });
    }

    render(){
        this.fetchData();
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={{uri: detail.detail.iconBase64}}
                    style={styles.image}
                />
                <View >
                    <Text style={styles.name}>{detail.title}</Text>
                </View>
                <View style={styles.info}>
                    <Text>图书作者：{detail.author}</Text>
                    <Text>ISBN编号：{detail.isbn}</Text>
                    <Text>图书类型：{detail.type}</Text>
                    <Text>图书单价：¥{detail.price}</Text>
                    <Text>图书库存：{detail.stock}件</Text>
                </View>
                <View>
                    <Text style={styles.description}>简介：{detail.detail.description}</Text>
                </View>
                <View >
                    <TextInput style={styles.counter} placeholder='请输入图书数量'
                               onChangeText={text => { count = text; }}
                               value={count}/>
                </View>
                <View style={styles.btn}>
                    <Button style={styles.loginBtnStyle} title="入车"
                            onPress={() => { this.cart(); }}>
                        <Text style={{color:'white'}}>入车</Text>
                    </Button>
                    <Button style={styles.loginBtnStyle} title="购买"
                            onPress={() => { this.buy(); }}>
                        <Text style={{color:'white'}}>购买</Text>
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    name:{
        fontSize:20
    },
    info: {
        marginLeft: -190
    },
    image: {
        width: 180,
        height: 240
    },
    description:{
        paddingLeft:50,
        paddingRight:55
    },
    counter: {
        marginTop: 20,
    },
    btn: {
        marginTop: 25,
        flexDirection: 'row',
    },
});
