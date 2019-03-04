import Vue from "nativescript-vue";

import Login from "./components/Login";
import StartupsList from "./components/Startups/StartupsList";
import StartupView from "./components/Startups/StartupView";
import StartupItem from "./components/Startups/StartupItem";
import IndustriesList from "./components/Industries/IndustriesList";
import IndustryStartup from "./components/Industries/IndustryStartup";

import store from './store';

const appSettings = require("application-settings");
appSettings.setString("favorites", '["5Helium", "Troomo"]')

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
        IndustryStartup
    }
}).$start();
