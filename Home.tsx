import React, {useState} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {GoogleSignin} from "@react-native-community/google-signin";
import Config from "./Config";
import {getDeviceName, getUniqueId} from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";
import {LoadingScreen} from "./LoadingScreen";


function setUpGoogleSignIn() {
    GoogleSignin.configure({
        webClientId: Config.development.serverWebClientId,
    });
}

async function signInWithGoogle() {
    try {
        return await GoogleSignin.signInSilently()
    } catch (error) {
        if (!await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true})) {
            throw new Error("Error: Google Play Services isn't available.");
        }

        return await GoogleSignin.signIn();
    }
}

async function signInWithServer(serverHost, idToken) {
    const response = await fetch(`${serverHost}/api/google-sign-in`, {
        method: 'POST',
        body: JSON.stringify({
            id_token: idToken,
            identifier: `${getUniqueId()} - ${(await getDeviceName())}`
        })
    })

    if (!response.ok) throw await response.json()
    return await response.json()
}

async function getAndVerifyToken() {
    const token = await AsyncStorage.getItem(`token`)
    if (!token) throw `Token not found.`
    return token
}

export const HomeScreen = ({navigation}) => {
    const [isReady, setIsReady] = useState(false)
    const [serverToken, setServerToken] = useState(null)

    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    getAndVerifyToken()
        .then(serverToken => {
            setIsReady(isReady)
            setServerToken(serverToken)
        })
        .catch(error => {
            navigation.navigate('Login')
        })

    return isReady ? (
        <SafeAreaView style={{flex: 1}}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Divider/>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button onPress={navigateDetails}>
                    Lorem Ipsum
                </Button>
            </Layout>
        </SafeAreaView>
    ) : (
        <LoadingScreen/>
    )
};
