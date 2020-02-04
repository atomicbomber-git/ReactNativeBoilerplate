import {Button, Text, Divider, Layout, TopNavigation} from "@ui-kitten/components";
import {SafeAreaView} from "react-navigation";
import React from "react";


export const LoadingScreen = () => (
    <SafeAreaView style={{flex: 1}}>
        <TopNavigation title='MyApp' alignment='center'/>
        <Divider/>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A laboriosam perferendis quibusdam. Animi aperiam asperiores corporis dolor eaque error ex molestiae neque nulla quasi qui quia sint velit voluptate, voluptatem?
            </Text>
        </Layout>
    </SafeAreaView>
)
