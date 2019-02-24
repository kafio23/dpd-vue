<template>
  <Page>
    <ActionBar title="App Demo"/>
      <Gradient direction="to right" colors="#4781FE, #3A53FF, #02556E">
        <FlexboxLayout flexDirection="column" justifyContent="center"
        class="all-height">

          <Image src="~/assets/images/icon_rocket.png" class="logo-image" />
          
          <StackLayout class="container">
            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/icon_user.png" class="icon-margin" witdh="18"
              height="18" />
              <TextField v-model="usernameInput" hint="Usuario"
              class="form-input"/>
            </FlexboxLayout>

            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/icon_password.png" class="icon-margin" witdh="18"
              height="18" />
              <TextField v-model="passwordInput" hint="Contraseña" secure="true"
              class="form-input"/>
            </FlexboxLayout>

            <Button text="Login" @tap="onButtontap" class="login-button" />
          </StackLayout>
        </FlexboxLayout>
      </Gradient>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      usernameInput: '',
      passwordInput: '',
    }
  },
  methods: {

  }
}
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
  width:100;
  margin-bottom: 20;
}
.icon-margin {
  margin-top:3;
  margin-right:10;
}
.login-button {
  background-color: #7881FE;
  color: $white;
  font-weight: bold;
  border-radius: 30;
  padding-top: 15;
  padding-bottom: 15;
  text-transform: uppercase;
  letter-spacing: 0.2;
}
.all-height {
  height: 100%
}
.container {
  margin-left:35;
  margin-right: 35;
}
</style>
