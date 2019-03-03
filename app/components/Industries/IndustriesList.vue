<template>
	<Page actionBarHidden="true">
		<WrapLayout>
			<FlexboxLayout alignItems="center" width="100%" height="10%" class="action-bar-costume">
				<GridLayout width="10%"  @tap="goBack">
					<Image src="~/assets/images/icon_left.png" witdh="30" height="30" />
				</GridLayout>
				<NavigationButton width="10%" text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
				<Label width="70%" text="Industrias"></Label>
				<GridLayout width="20%" @tap="showMenu" class='menu-button-container'>
					<Image src="~/assets/images/icon_menu.png" witdh="30" height="30" />
				</GridLayout>
			</FlexboxLayout>
		</WrapLayout>
	</Page>
</template>

<script>

export default {
  data() {
    return {
    }
  },

	mounted() {
	},

	methods: {
    goBack() {
			this.$navigateBack();
    },
    
    showMenu() {
      action({
        message: "¿Deseas salir?",
        actions: ["Log Off"],
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result === "Log Off") {
          this.logout();
        }
      });
    },
  }
}

</script>