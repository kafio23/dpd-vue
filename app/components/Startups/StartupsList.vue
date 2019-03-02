<template>
	<Page>
		<ActionBar title="Startups"/>
      <WrapLayout backgroundColor="#2cb5e8" class="main-list" @loaded="load()">
        <SearchBar width="100%" height="10%" ref="searchBar" @clear="onClear" hint="Buscar..."
        v-model="searchText" @textChange="onTextChanged" @submit="onSubmit" class="search-bar" />

        <ListView width="100%" height="70%" for="item in startupItems" @itemTap="onItemTap" style="height:300px">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <!-- <StackLayout :visibility="item[8] ? 'visible' : 'collapsed'"> -->
              <StartupItem ref="startupItem" :item="item" ></StartupItem>
            <!-- </StackLayout> -->
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
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import * as http from 'tns-core-modules/http'
const appSettings = require("application-settings");

const GOOGLE_API_KEY = process.env.VUE_APP_KEY;
const spreadsheetId = process.env.VUE_APP_SHEET;
const range = 'Sheet1';

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
    this.$refs.searchBar.nativeView.dismissSoftInput();
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
      console.log("submitted text is", this.searchText);
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
  }
}
</script>

<style scoped lang="scss">
@import "../../app-variables";

.main-list {
  opacity: 0.6;
}
.search-bar {
  background: $white;
}
</style>