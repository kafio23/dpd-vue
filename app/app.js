import Vue from "nativescript-vue";

import Login from "./components/Login";
import StartupsList from "./components/Startups/StartupsList";
import StartupView from "./components/Startups/StartupView";
import StartupItem from "./components/Startups/StartupItem";
import StartupWeb from "./components/Startups/StartupWeb";
import IndustriesList from "./components/Industries/IndustriesList";
import IndustryStartups from "./components/Industries/IndustryStartups";

import store from './store';

const appSettings = require("application-settings");
appSettings.setString("favorites", '[]')

new Vue({
    store,

    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login,
        StartupsList,
        StartupView,
        StartupItem,
        IndustriesList,
        IndustryStartups
    }
}).$start();
