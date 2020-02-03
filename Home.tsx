import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {GoogleSignin} from "@react-native-community/google-signin";
import Config from "./Config";
import {getDeviceName, getUniqueId} from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";
import {ToastAndroid} from "react-native";
import {err} from "react-native-svg/lib/typescript/xml";

GoogleSignin.configure({
    webClientId: Config.development.serverWebClientId,
});

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


async function signInWithServer(idToken) {
    const deviceName = await getDeviceName()

    const response = await fetch(`${Config.development.serverHost}/api/google-sign-in`, {
        method: 'POST',
        body: JSON.stringify({
            id_token: idToken,
            identifier: `${getUniqueId()} - ${deviceName}`
        })
    })

    if (!response.ok) {
        throw await response.json()
    }

    return await response.json()
}

async function getTokenAndAuthenticateWithServer() {
    const serverAccessToken = await AsyncStorage.getItem(`token`)
    if (!serverAccessToken) throw `Token not found.`
    return serverAccessToken
}

export const HomeScreen = ({navigation}) => {
    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    getTokenAndAuthenticateWithServer()
        .then(serverAccessToken => {
            alert(serverAccessToken)
        })
        .catch(error => {
            navigation.navigate(`Login`)
        })

    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Divider/>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button onPress={navigateDetails}>
                    Lorem Ipsum
                </Button>
            </Layout>
        </SafeAreaView>
    );
};
