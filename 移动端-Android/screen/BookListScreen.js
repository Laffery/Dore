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

const GET_BOOKS_URL=apiUrl+"/book/getAll";

export class BookListScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            books:[],
            showBooks:[],
            isLoading: true,
        }
    }

    componentDidMount(){
        const _retrieveData = async () => {
            try {
                this.fetchData();
            } catch (error) {}
        }
        _retrieveData().then();
    }

    fetchData() {
        axios.get(GET_BOOKS_URL).then((resp) => {
            this.setState({
                isLoading:false,
                books: resp.data,
                showBooks:resp.data
            })
        });
    }

    getText(data) {
        let arr=[];
        let list=this.state.books;
        for (let i = 0; i < list.length; i++) {
            if (list[i].title.indexOf(data) >= 0||
                list[i].type.indexOf(data) >= 0||
                list[i].author.indexOf(data) >= 0||
                list[i].detail.description.indexOf(data) >= 0) {
                arr.push(list[i])
            }
        }
        this.setState({
            showBooks:arr
        })
    }

    navigateToDetail({item}){
        this.props.navigation.push("Detail",{detail:item});
    }

    renderBook=({item})=>{
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <Image
                        source={{uri: item.detail.iconBase64}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                    <View >
                        <Text style={styles.price}>¥{item.price}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    cancel(){
        this.setState({
            showBooks:this.state.books
        });
    }
    render(){
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
                    cancelSearching={()=>this.cancel()}
                />
                <FlatList
                    data={this.state.showBooks}
                    renderItem={this.renderBook}
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
