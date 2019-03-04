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

      <ListView height="90%" for="startup in startups" @itemTap="onItemTap">
        <v-template>
          <WrapLayout class="item-container">
            <FlexboxLayout flexDirection="column" >
              <Label :text="startup.name" className="startupName" />
              <Label :text="startup.industry" className="startupType" />
            </FlexboxLayout>
            <!-- <GridLayout  width="20%" height="30%" class="favorite-container">
              <Image src="~/assets/images/icon_star_gray.png" witdh="30" height="30" />
            </GridLayout> -->
          </WrapLayout>
        </v-template>
      </ListView>

		</StackLayout>
	</Page>
</template>

<script>
import Login from '@/components/Login'

import { mapGetters } from 'vuex'

export default {
  props: ['industry'],
  
  computed: {
    ...mapGetters({
      itemList: 'itemList',
      isLoading: 'isProcessing'
    }),
    startups: function() {
      return this.itemList
    },
  },

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