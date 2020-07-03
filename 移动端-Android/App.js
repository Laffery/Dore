/* cannot load script solved:
    react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from "./screen/LoginScreen";
import {SignupScreen} from "./screen/SignupScreen";
import {HomeScreen} from "./screen/HomeScreen";
import {AuthContext} from "./context";

const Stack = createStackNavigator();

export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_UP':
                    return {
                        ...prevState,
                        isSignup: true,
                    }
                case 'SIGN_END':
                    return {
                        ...prevState,
                        isSignup: false,
                    }
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isSignup: false,
            isSignout: false,
            userToken: null,
        }
    );
    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_UP' });
            },
            signEnd: async data => {
                dispatch({ type: 'SIGN_END' })
            }
        }),
        []
    )
    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    { state.userToken == null ? (
                        state.isSignup ? (
                            <Stack.Screen
                                name="Sign up"
                                component={SignupScreen}
                                options={{
                                    title: 'Sign up',
                                    animationTypeForReplace: state.isSignup ? 'pop' : 'push',
                                    headerShown:false,
                                }}/>
                    ) : (
                        <Stack.Screen
                            name="Sign in"
                            component={LoginScreen}
                            options={{
                                title: 'Sign in',
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                headerShown:false,
                            }}
                        />)
                    ) : (
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                headerShown:false
                            }}/>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
