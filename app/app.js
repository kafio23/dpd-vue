import Vue from "nativescript-vue";

import Home from "./components/Home";
import Login from "./components/Login";

Vue.registerElement("Gradient", () => require("nativescript-gradient").Gradient);

new Vue({

    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login
    }
}).$start();
