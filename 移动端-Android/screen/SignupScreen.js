import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    Button,
    Alert
} from 'react-native';
import {AuthContext} from "../context";
import {apiUrl} from "../urlconfig";
import axios from 'axios';

let {width,height} = Dimensions.get('window');
const SIGN_UP_URL=apiUrl+"/user/save";

function submit({email,name,password,confirm,signEnd}) {
    if (email.length === 0) {
        Alert.alert("邮箱不能为空！");
        return;
    }
    else {
        let format =  /^([a-zA-Z0-9.]{3,12})+@[a-zA-Z0-9]+\.([a-zA-Z.]{2,12})$/;
        if (!format.test(email)) {
            Alert.alert("邮箱格式不正确");
            return;
        }
    }

    if (name.length === 0) {
        Alert.alert("用户名不能为空！");
        return;
    }
    else if (name.length < 3 || name.length > 12) {
        Alert.alert("用户名需为 3 到 12 个字符！");
        return;
    }

    if (password.length === 0) {
        Alert.alert("密码不能为空");
        return;
    }
    else if (password.length < 6 || password.length > 16) {
        Alert.alert("密码需为 6 到 16 个字符！");
        return;
    }

    if (confirm.length === 0) {
        Alert.alert("请再次输入密码！");
        return;
    }
    else if (password !== confirm){
        Alert.alert("两次密码输入需保持一致！");
        return;
    }

    axios.post(SIGN_UP_URL, {
        email: email,
        name: name,
        password: password,
        permission: 1,
        role: 'custom',
        avatar: {
            iconBase64: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
        }
    }).then((response) => {
        if(response.data === 'success'){
            Alert.alert("注册成功！");
            signEnd();
        }
        else {
            Alert.alert("此用户名已存在！");
        }
    });
}

export function SignupScreen(){
    const [email, serEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword]=useState('');
    const [confirm, setConfirm] = useState('');
    const { signEnd } = React.useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Sign Up</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => serEmail(text)}
                    value={email}
                    placeholder={'请输入电子邮箱'} />

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

                <TextInput
                    style={styles.textInputStyle}
                    placeholder='请再次输入密码'
                    onChangeText={text => setConfirm(text)}
                    value={confirm}
                    password={true}
                    secureTextEntry={true}/>

                <View style={styles.btn}>
                    <Button style={styles.submitBtnStyle} title="提交" onPress={() => {
                        submit({email,name,password,confirm,signEnd});
                    }}>
                        <Text style={{color:'white'}}>提交</Text>
                    </Button>

                    <Button style={styles.submitBtnStyle} title="返回" onPress={() => {
                        signEnd();
                    }}>
                        <Text style={{color:'white'}}>返回</Text>
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
        marginBottom:5,
        borderRadius: 5,
    },
    btn: {
        flexDirection: 'row',
        marginTop: 20,
    },
    submitBtnStyle: {
        width: width*0.3,
        height: 40,
        backgroundColor:'blue',
        marginTop:30,
        marginBottom: 20,
        borderRadius:10
    },
    titleStyle: {
        fontSize:40,
        alignItems:'center',
        paddingBottom:10
    },
});
