import Vue from "nativescript-vue";

import Home from "./components/Home";
import Login from "./components/Login";
import StartupsList from "./components/Startups/StartupsList";
import StartupView from "./components/Startups/StartupView";
import StartupItem from "./components/Startups/StartupItem";
import StartupFilter from "./components/Startups/StartupFilter";

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
        StartupFilter
    }
}).$start();
