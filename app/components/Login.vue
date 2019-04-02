<template>
  <Page>
    <ActionBar title="App Demo"/>
    <StackLayout class="login-container" colors="#4781FE, #3A53FF, #02556E">
      <FlexboxLayout flexDirection="column" justifyContent="center" class="all-height">
        <Image src="~/assets/images/icon_rocket.png" class="logo-image"/>

        <StackLayout class="container">
          <FlexboxLayout alignItems="center" class="border-bottom">
            <Image src="~/assets/images/icon_user.png" class="icon-margin" witdh="18" height="18"/>
            <TextField
              v-model="user.email"
              hint="Email"
              keyboardType="email"
              autocapitalizationType="none"
              returnKeyType="next"
              @returnPress="focusPassword()"
              class="form-input"
            />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom">
            <Image
              src="~/assets/images/icon_password.png"
              class="icon-margin"
              witdh="18"
              height="18"
            />
            <TextField
              ref="password"
              v-model="user.password"
              hint="Contraseña"
              secure="true"
              class="form-input"
            />
          </FlexboxLayout>

          <Button text="Login" @tap="submit" class="login-button"/>
        </StackLayout>
      </FlexboxLayout>
    </StackLayout>
  </Page>
</template>

<script>
import {
  connectionType,
  getConnectionType
} from "tns-core-modules/connectivity";
import User from "@/models/User";
import StartupsList from "@/components/Startups/StartupsList";
import userData from "@/assets/data/user.json";
import LoginService from "@/services/LoginService";

const loginService = new LoginService();

export default {
  mounted() {
    console.log("LOGIN VIEW");
  },

  data() {
    return {
      isLoggingIn: true,
      user: new User()
    };
  },
  methods: {
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Ingrese usuario y contraseña");
        return;
      }
      if (this.isLoggingIn) {
        this.login();
        // } else {
        //     this.register();
      }
    },

    login() {
      loginService
        .login(this.user)
        .then(() => {
          this.$navigateTo(StartupsList);
        })
        .catch(() => {
          this.alert("Desafortunadamente no te encuentras registrado.");
        });
    },

    alert(message) {
      return alert({
        title: "STARTUP APP",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../app-variables";
.border-bottom {
  border-bottom-width: 1;
  border-bottom-color: $white;
  margin-bottom: 35;
  padding-bottom: 8;
}
.fa {
  color: $white;
}
.form-input {
  color: $white;
  placeholder-color: $white;
}
.logo-image {
  width: 100;
  margin-bottom: 20;
}
.icon-margin {
  margin-top: 3;
  margin-right: 10;
}
.login-button {
  // background-color: #8AABE0;
  background-color: #4781fe;
  color: $white;
  font-weight: bold;
  border-radius: 30;
  padding-top: 15;
  padding-bottom: 15;
  text-transform: uppercase;
  letter-spacing: 0.2;
}
.login-container {
  background-color: #1fc8db;
  // background-image: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
  background-image: linear-gradient(
    141deg,
    #4781fe 0%,
    #1fc8db 51%,
    #2cb5e8 75%
  );
}
.all-height {
  height: 100%;
}
.container {
  margin-left: 35;
  margin-right: 35;
}
</style>
