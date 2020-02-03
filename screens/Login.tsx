import {Divider, Layout, Text, TopNavigation} from "@ui-kitten/components";
import {SafeAreaView} from "react-navigation";
import React from "react";
import Config from "../Config"
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={Config.appName} alignment='center'/>
            <Divider/>
            <Layout style={styles.main}>
                <Text category='h1'>
                    Log In
                </Text>
            </Layout>
        </SafeAreaView>
    )
}
