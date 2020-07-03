import React from 'react';
import {View,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Profile} from '../component/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import {BookScreen} from './BookScreen';
import {BookListScreen} from "./BookListScreen";
import {CartScreen} from './CartScreen';
import {OrdersScreen} from './OrdersScreen';
import {OrderScreen} from './OrderScreen';
import { SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();

function BookListAndDetail(){
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="BookList" component={BookListScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Detail" component={BookScreen}/>
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

function MyCartScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CartScreen/>
        </View>
    );
}

function MyOrderScreen() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="Orders" component={OrdersScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Order" component={OrderScreen}/>
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

function MyProfileScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Profile navigation={navigation}/>
        </View>
    );
}

const Drawer = createDrawerNavigator();
export function HomeScreen(){
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Books" component={BookListAndDetail} />
            <Drawer.Screen name="Cart" component={MyCartScreen} />
            <Drawer.Screen name="Order" component={MyOrderScreen} />
            <Drawer.Screen name="Profile" component={MyProfileScreen} />
        </Drawer.Navigator>
    );
}
