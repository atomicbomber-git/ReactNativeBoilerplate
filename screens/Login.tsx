import {Divider, Layout, Text, TopNavigation} from "@ui-kitten/components";
import {SafeAreaView} from "react-navigation";
import React from "react";
import Config from "../Config"

export const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={Config.appName} alignment='center'/>
            <Divider/>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h1'>DETAILS</Text>
            </Layout>
        </SafeAreaView>
    )
}
