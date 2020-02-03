import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {HomeScreen} from "./Home";
import {DetailsScreen} from "./Details";
import {LoginScreen} from "./screens/Login";

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
    Login: LoginScreen,
}, {
    headerMode: 'none',
});

export const AppNavigator = createAppContainer(HomeNavigator);
