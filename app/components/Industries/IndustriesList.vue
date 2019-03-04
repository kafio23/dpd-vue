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
      
      <ListView width="100%" height="60%" for="industry in industryItems" @itemTap="onItemTap" style="height:300px">
        <v-template>
          <Label :text="industry"></Label>
            <!-- <StartupItem ref="industryItem" :industry="industry" ></StartupItem> -->
        </v-template>
      </ListView>
		</WrapLayout>
	</Page>
</template>

<script>

import Login from '@/components/Login'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { industriesList, itemList } from '~/store/getters';

export default {
  computed: {
    ...mapGetters({
      itemList: 'itemList',
      isLoading: 'isProcessing'
    }),

    startupItems: function() {
      return this.itemList
    },

    industryItems: function() {
      let industries = []
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.startupItems.forEach(element => {
        industries.push(element.industry)
      })
      industries = industries.filter( onlyUnique )
      return industries
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

    logout: function() {
      this.$navigateTo(Login)
    },
  }
}

</script>