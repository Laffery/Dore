import * as React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';

let name = 'username';
let avatar = 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg';

function fetchData() {
    let _get_name_ = async () => {
        try {
            name = await AsyncStorage.getItem('@Dore:name');
            avatar = await AsyncStorage.getItem('@Dore:avatar');
        }
        catch (e) {}
    }

    _get_name_().then();
}


export function Profile() {
    fetchData();
    const {signOut} = React.useContext(AuthContext);
    return (
        <View>
            <View>
                <Image source={{uri: avatar}} style={styles.image}/>
            </View>
            <View>
                <Text style={styles.username}>{name}</Text>
            </View>
            <View>
                <Button title="退出当前账户" onPress={() => { signOut(); }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    username: {
        fontSize: 30,
        width: 200,
        textAlign: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 50
    },
    btn: {
        width: 160,
        height: 50
    }
});
