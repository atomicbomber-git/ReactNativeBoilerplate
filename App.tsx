import React, {useEffect} from 'react';
import {StyleSheet, Text,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin} from "@react-native-community/google-signin";
import {serverWebClientId} from "./config";

GoogleSignin.configure({
    webClientId: serverWebClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

async function signIn() {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
}

const App = () => {

    useEffect(() => {
        signIn()
            .then(authData => {
                console.info(authData)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <>
            <Text>
                This app tries to log in
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
