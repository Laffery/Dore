import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    Button,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from "../context";
import {apiUrl} from "../urlconfig";
import axios from 'axios';

let {width,height} = Dimensions.get('window');
const LOGIN_URL=apiUrl+"/user/login";

function sign_in({name,password,signIn}) {
    axios.post(LOGIN_URL, {
        name: name,
        password: password
    }).then((response) => {
        let data = response.data;
        if (data.id === 0) {
            Alert.alert("此用户不存在！");
        }
        else if (data.id === -1) {
            Alert.alert("密码错误，请重新输入！");
        }
        else if (data.id === -2) {
            Alert.alert('此用户已被禁止！');
        }
        else {
            if(data.role === 'admin') {
                Alert.alert("管理员" + name + "登录成功！");
            }
            else {
                Alert.alert("用户" + name + "登录成功！");
            }

            let _store_data = async () => {
                try {
                    await AsyncStorage.setItem('@Dore:id', data.id.toString()).then();
                    await AsyncStorage.setItem('@Dore:name', data.name).then();
                    await AsyncStorage.setItem('@Dore:role', data.role).then();
                    await AsyncStorage.setItem('@Dore:avatar', data.avatar.iconBase64).then();
                }
                catch (e) {
                    console.log(e.message);
                }
            };

            _store_data().then(r => { signIn(); });
        }
    });
}
export function LoginScreen(){
    const [name, setName] = useState('');
    const [password, setPassword]= useState('');
    const { signIn } = React.useContext(AuthContext);
    const { signUp } = React.useContext(AuthContext);
    return (
        <View style={{ flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.bookstore}>DoreBook</Text>
                <Text style={styles.titleStyle}>Login</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder={'请输入用户名'} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder='请输入密码'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}/>

                <View style={styles.btn}>
                    <Button style={styles.loginBtnStyle} title="登录"
                            onPress={() => { sign_in({name,password,signIn}); }}>
                        <Text style={{color:'white'}}>登录</Text>
                    </Button>

                    <Button style={styles.signBtnStyle} title="注册"
                            onPress={() => {
                                signUp();
                            }}>
                        <Text style={{color:'white'}}>注册</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: 'pink'
    },
    textInputStyle: {
        width:width*0.7,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        marginBottom: 5,
        borderRadius: 5
    },
    btn: {
        marginTop: 25,
        flexDirection: 'row',
    },
    loginBtnStyle: {
        width: width*0.4,
        height: 40,
        backgroundColor:'blue',
        borderRadius:10
    },
    signBtnStyle: {
        width: width*0.4,
        height: 40,
        backgroundColor:'green',
        borderRadius:10
    },
    titleStyle: {
        fontSize:40,
        alignItems:'center',
        paddingBottom:10
    },
    bookstore: {
        fontSize: 50,
        color: 'skyblue',
        alignItems: 'center',
        paddingBottom: 20,
    }
});
