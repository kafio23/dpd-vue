<template>
  <Page actionBarHidden="true">
    <WrapLayout>
      <FlexboxLayout alignItems="center" width="100%" height="10%" class="action-bar-costume">
        <GridLayout width="10%" @tap="goBack">
          <Image src="~/assets/images/icon_left.png" witdh="30" height="30"/>
        </GridLayout>
        <NavigationButton
          width="10%"
          text="Go back"
          android.systemIcon="ic_menu_back"
          @tap="goBack"
        />
        <Label width="70%" :text="`Startup ${item.name}`"></Label>
      </FlexboxLayout>

      <WrapLayout height="90%" class="startup-header">
        <WebView src="http://nativescript-vue.org/"/>
      </WrapLayout>
    </WrapLayout>
  </Page>
</template>

<script>
export default {
  props: ["item"],

  data() {
    return {};
  },

  methods: {
    goBack() {
      this.$navigateBack();
    }
  }
};
</script>