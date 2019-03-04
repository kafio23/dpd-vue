<template>
	<Page actionBarHidden="true">
		<StackLayout @loaded="load()">

			<FlexboxLayout alignItems="center" height="10%" class="action-bar-costume">
				<GridLayout width="10%"  @tap="goBack">
					<Image src="~/assets/images/icon_left.png" witdh="30" height="30" />
				</GridLayout>
				<Label width="70%" :text="industry.name"></Label>
				<GridLayout width="20%" @tap="showMenu" class='menu-button-container'>
					<Image src="~/assets/images/icon_menu.png" witdh="30" height="30" />
				</GridLayout>
			</FlexboxLayout>

      <ListView :visibility="isBusy ? 'collapsed' : 'visible'" height="90%" for="startup in startups" @itemTap="onItemTap">
        <v-template>
          <StartupItem ref="startupItem" :item="startup" ></StartupItem>
        </v-template>
      </ListView>

      <ActivityIndicator :visibility="isBusy ? 'visible' : 'collapsed'" width="100%" height="10%" :busy="isBusy"></ActivityIndicator>

		</StackLayout>
	</Page>
</template>

<script>
import Login from '@/components/Login'
import IndustriesList from './IndustriesList.vue'
import StartupItem from '@/components/Startups/StartupItem.vue'
import StartupView from '@/components/Startups/StartupView.vue'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  props: ['industry'],

  components: {
    StartupItem
  },
  
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
      isBusy: true,
    }
  },

	mounted() {
  },

  methods: {
    ...mapActions([
      'loadItems',
    ]),

    goBack() {
      this.$navigateBack();
    },

    load() {
      this
        .loadItems({searchText: this.industry.name, byType: 1})
        .then(() => {
          this.isBusy = false
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your Startup list.");
        })
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

    onItemTap({ item }) {
      this.$navigateTo(StartupView, { props: { item: item } } )
    },
  }
}
</script>