import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {GoogleSignin} from "@react-native-community/google-signin";
import Config from "./Config";
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

    const response = await fetch(`${Config.development.serverHost}/api/google-sign-in`, {
        method: 'POST',
        body: JSON.stringify({
            id_token: idToken
        })
    })

    return await response.json()
}

export const HomeScreen = ({navigation}) => {

    useEffect(() => {
        signInWithGoogle().then(authData => {
            signInWithServer(authData.idToken)
                .then(payload => {
                    console.info(payload)
                })
                .catch(error => {
                    console.info(error)
                })
        }).catch(error => {
            console.error(error)
        })
    }, [])

    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Divider/>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={navigateDetails}>
                    Experiment
                </Button>
            </Layout>
        </SafeAreaView>
    );
};
