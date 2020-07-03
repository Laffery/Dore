import * as React from 'react';
import {
    View,
    Text,
    Button,
    AppRegistry,
    StyleSheet,
    TextInput,
    PixelRatio,
    Dimensions
} from 'react-native';
let {width,height} = Dimensions.get('window');
export class SearchBar extends React.Component{
    static defaultProps = {
        searchBooks:{},
        cancelSearching:{}
    }

    constructor(props) {
        super(props);
        this.state = {text: '',isCancel:false};
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.flexDirection, styles.inputHeight]}>
                    <View style={styles.flex}>
                        <TextInput
                            style={styles.input}
                            returnKeyType="search"
                            placeholder="请输入图书关键字"
                            value={this.state.text}
                            onChangeText={this.textChange.bind(this)}/>
                    </View>
                    <View style={styles.btn}>
                        <Text style={styles.search} onPress={()=>this.search()}>
                            {this.state.isCancel?'取消':'搜索'}
                        </Text>
                    </View>

                </View>
            </View>
        );
    }

    textChange(text){
        if(text===''){
            this.setState({
                isCancel:false
            });
        }
        this.setState({
            text: text
        });
    }

    search(){
        if(this.state.text!==''&& this.state.isCancel===false) {
            this.setState({
                isCancel: !this.state.isCancel
            }, ()=> {
                this.props.searchBooks(this.state.text);
            });
        }else if(this.state.isCancel===true){
            this.setState({
                isCancel: !this.state.isCancel,
                text:''
            },()=>{
                this.props.cancelSearching();
            });
        }
    }
}

const styles = StyleSheet.create({
    container:{
        height:46,
        width:width,
        backgroundColor: 'pink'
    },
    flex:{
        flex:1
    },
    flexDirection:{
        flexDirection:'row'
    },
    inputHeight:{
        height:45,
    },
    input:{
        height:45,
        borderWidth:1,
        marginLeft: 10,
        paddingLeft:5,
        borderColor: 'pink',
        borderRadius: 4,
        backgroundColor: '#fcf5ff'
    },
    btn:{
        width:55,
        marginLeft:-5,
        marginRight:5,
        backgroundColor:'transparent',
        height:45,
        justifyContent:'center',
        alignItems: 'center'
    },
    search:{
        color:'#bbb',
        fontSize:15,
        fontWeight:'bold'
    }
});
