<template>
	<Page actionBarHidden="true">
		<StackLayout>

			<FlexboxLayout alignItems="center" height="10%" class="action-bar-costume">
				<GridLayout width="10%"  @tap="goBack">
					<Image src="~/assets/images/icon_left.png" witdh="30" height="30" />
				</GridLayout>
				<Label width="70%" :text="industry.name"></Label>
				<GridLayout width="20%" @tap="showMenu" class='menu-button-container'>
					<Image src="~/assets/images/icon_menu.png" witdh="30" height="30" />
				</GridLayout>
			</FlexboxLayout>

		</StackLayout>
	</Page>
</template>

<script>
import Login from '@/components/Login'

export default {
	props: ['industry'],

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

    logout: function() {
      this.$navigateTo(Login)
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