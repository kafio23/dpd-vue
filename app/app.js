import Vue from "nativescript-vue";

import Home from "./components/Home";
import Login from "./components/Login";
import StartupsList from "./components/Startups/StartupsList";

Vue.registerElement("Gradient", () => require("nativescript-gradient").Gradient);

new Vue({

    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login,
        StartupsList
    }
}).$start();
