<template>
	<Page actionBarHidden="true">
		<!-- <ActionBar title="Startups"/> -->
    
    
    <WrapLayout backgroundColor="#2cb5e8" class="main-list" @loaded="load()">

      <FlexboxLayout alignItems="center" width="100%" height="10%" class="action-bar-costume">
        <Label width="80%" text="Lista Startups"></Label>
        <GridLayout width="20%" @tap="showMenu" class='menu-button-container'>
          <Image src="~/assets/images/icon_menu.png" witdh="30" height="30" />
        </GridLayout>
      </FlexboxLayout>

      <SearchBar :visibility="isBusy ? 'collapsed' : 'visible'" width="100%" height="10%" ref="searchBar" @clear="onClear" hint="Buscar..."
      v-model="searchText" @textChange="onTextChanged" @submit="onSubmit" class="search-bar" />

      <ListView width="100%" height="60%" for="item in startupItems" @itemTap="onItemTap" style="height:300px">
        <v-template>
            <StartupItem ref="startupItem" :item="item" ></StartupItem>
        </v-template>
      </ListView>
      
      <Button width="100%" height="10%" text="Back to Master" @tap="$navigateBack" />
      
      <ActivityIndicator width="100%" height="10%" :busy="isBusy"></ActivityIndicator>
    </WrapLayout>
	</Page>
</template>

<script>

import StartupView from './StartupView.vue'
import StartupItem from './StartupItem.vue'
import Login from '@/components/Login'
import LoginService from '@/services/LoginService'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import * as http from 'tns-core-modules/http'
import * as platformModule from 'tns-core-modules/platform'
const appSettings = require("application-settings");

const GOOGLE_API_KEY = process.env.VUE_APP_KEY;
const spreadsheetId = process.env.VUE_APP_SHEET;
const range = 'Sheet1';

const loginService = new LoginService()

export default {
  components: {
    StartupItem
  },

  computed: {
    ...mapGetters({
      itemList: 'itemList',
      deletedItemList: 'deletedItemList',
      isLoading: 'isProcessing'
    }),
    startupItems: function() {
      return this.itemList
    },
    favoriteItems: function() {
      // return this.isShowingRecent ? this.deletedItemList : this.itemList
    },
    pageClasses: function () {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': platformModule.isIOS,
        'platform-android': platformModule.isAndroid
      }
    }
  },

  data() {
    return {
      listOfKeys: [],
      listOfItems: [],
      isBusy: true,
      errors: []
    }
  },
	mounted() {
     if (platformModule.isAndroid) {
       this.$refs.searchBar.nativeView.dismissSoftInput();
        // textField.dismissSoftInput(); // if showing it will hide, if not showing nothing will happen
    }else if (platformModule.isIOS) {

        // textField.ios.resignFirstResponder(); // same here.. 
    }
    // this.$refs.searchBar.nativeView.dismissSoftInput();
  },

  methods: {
    ...mapActions([
      'loadItems',
    ]),
    
    load() {
      this
        .loadItems(this.searchText)
        .then(() => {
          this.isBusy = false
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your grocery list.");
        })
    },

    onItemTap({ item }) {
      console.log(`Tapped on ${item.name}`);
      this.$refs.searchBar.nativeView.dismissSoftInput();
      this.$navigateTo(StartupView, { props: { item: item } } )
    },

    toggleFavoriteItem() {
      if (this.item.favorite) {
        this.$store.dispatch('toggleFavoriteItem', this.item)
        .catch( () => {
          alert("An error occurred managing your startup.");
        });
      }
      else {
        this.$store.dispatch('toggleFavoriteItem', this.item)
          .catch( () => {
            alert("An error occurred managing your startup.");
          });
      }
    },

    onTextChanged() {
      this
      .loadItems(this.searchText)
        .then(() => {
          this.isBusy = false
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your grocery list.");
        })
    },

    onSubmit() {
      this.$refs.searchBar.nativeView.dismissSoftInput();
      this
      .loadItems(this.searchText)
        .then(() => {
          this.isBusy = false
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your grocery list.");
        })
    },

    onClear(){
      this
      .loadItems(this.searchText)
        .then(() => {
          this.isBusy = false
          this.$refs.searchBar.nativeView.dismissSoftInput();
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your grocery list.");
          this.$refs.searchBar.nativeView.dismissSoftInput();
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
  }
}
</script>

<style scoped lang="scss">
@import "../../app-variables";

.main-list {
  // opacity: 0.6;
}
.search-bar {
  background: $white;
}
</style>