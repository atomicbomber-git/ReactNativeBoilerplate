import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from "@react-native-community/google-signin";
import {development as config} from "./config";

GoogleSignin.configure({
    webClientId: config.serverWebClientId,
    offlineAccess: true
});

async function signInWithGoogle() {
    try {
        return await GoogleSignin.signInSilently()
    }
    catch (error) {
        if (!await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })) {
            throw new Error("Error: Google Play Services isn't available.");
        }

         return await GoogleSignin.signIn();
    }
}

async function signInWithServer(authData) {
    const response = await fetch(`${config.serverHost}/api/socialite`, {
        method: 'POST',
        headers: { 'ContentType': 'application/json' },
        body: JSON.stringify({
            code: authData.serverAuthCode
        })
    })

    return await response.json()
}

const App = () => {
    async function signInAsync() {
        const authData = await signInWithGoogle()

        console.info(authData)

        return "TEST"
        // return signInWithServer(authData)
    }

    function signIn() {
        signInAsync()
            .then(authData => {
                console.info(authData)
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <>
            <View style={styles.home}>

                <GoogleSigninButton
                    onPress={() => { signIn() }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default App;
