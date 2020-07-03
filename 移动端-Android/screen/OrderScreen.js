import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { SearchBar } from '../component/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export class OrderScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            items: []
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
        this.setState({
            items: this.props.route.params.detail.items
        })
    }

    renderBook=({item})=>{
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <Image
                        source={{uri: item.book.detail.iconBase64}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.book.title}</Text>
                        <Text style={styles.author}>{item.book.author}</Text>
                    </View>
                    <View >
                        <Text style={styles.price}>¥{item.book.price}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render(){
        return (
            <SafeAreaView style={{ flex: 2}}>
                <SearchBar
                    searchBooks={(data) => this.getText(data)}
                    cancelSearching={()=>this.cancel()}
                />
                <FlatList
                    data={this.state.items}
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
