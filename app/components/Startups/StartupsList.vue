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
            <FlexboxLayout>
              <StartupItem ref="startupItem" :item="item" ></StartupItem>
              <Image :src="item.favorite ? '~/assets/images/icon_star_filled.png' : '~/assets/images/icon_star_gray.png'" witdh="60"
					    height="60" @tap="favoriteItem(item)" />
            </FlexboxLayout>
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

import axios from 'axios';
import * as http from 'tns-core-modules/http'
// import favorites from '@/assets/data/favorites.json'
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
      // return this.isShowingRecent ? this.deletedItemList : this.itemList
      return this.itemList
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
      errors: [],
      isFavorite: false,
      favoriteStartups: []
    }
  },
	mounted() {
    this.$refs.searchBar.nativeView.dismissSoftInput();
    // // this.$forceUpdate()
    // console.log('LIST VIEW')
    // axios
    //   .get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}!A1:G?key=${GOOGLE_API_KEY}`)
    //   .then(response => {
    //     this.listOfKeys = response.data.values[0]
    //     this.listOfItems = response.data.values.slice(1)
    //     this.listOfItems.forEach( item => {
    //       if (item.length < 7) {
    //         item.push('No tiene')
    //       }
    //       if (item.length > 6) {
    //         item.push(false)
    //         if (eval(appSettings.getString("favorites")).includes(item[0])) {
    //           item[7] = true
    //         }
    //         item[8] = true
    //       }
    //     });
    //     // this.$refs.searchBar.nativeView.dismissSoftInput();
    //     this.isBusy = false
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //     this.errors = error
    //   })
  },

  methods: {
    ...mapActions([
      'loadItems',
    ]),
    
    load() {
      this
        .loadItems()
        .then(() => {
          this.isBusy = false
        })
        .catch(error => {
          console.error(error)
          alert("An error occurred loading your grocery list.");
        })
    },

    onItemTap({ item }) {
      console.log(`Tapped on ${item[0]}`);
      this.$refs.searchBar.nativeView.dismissSoftInput();
      this.$navigateTo(StartupView, { props: { item: item } } )
    },

    onTextChanged() {
      // console.log("text changed to", this.searchText);
      console.log("submitted text is", this.searchText);
      let resultado = [];
      let indices = [];
      let filter = this.searchText.toUpperCase();
      
      for (let i = 0; i < this.listOfItems.length; i++) {
        let txtValue = this.listOfItems[i][0];
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          this.listOfItems[i][8]= true;
          indices.push(i)
        } else {
          this.listOfItems[i][8]= false;
        }      
      }

      for (let i = 0; i < this.listOfItems.length; i++) {
        if (indices.includes(i)) {
          resultado.push(this.listOfItems[i])
        }
      }
      this.listOfItems = resultado
    },

    onSubmit() {
      console.log("submitted text is", this.searchText);
      this.$refs.searchBar.nativeView.dismissSoftInput();
      let resultado = [];
      let indices = [];
      let filter = this.searchText.toUpperCase();

      for (let i = 0; i < this.listOfItems.length; i++) {
        let txtValue = this.listOfItems[i][0];
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          this.listOfItems[i][8]= true;
          indices.push(i)
        } else {
          this.listOfItems[i][8]= false;
        }      
      }

      for (let i = 0; i < this.listOfItems.length; i++) {
        if (indices.includes(i)) {
          resultado.push(this.listOfItems[i])
        }
      }
      this.listOfItems = resultado
    },

    onClear(){
      this.$refs.searchBar.nativeView.dismissSoftInput();
      axios
      .get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}!A1:G?key=${GOOGLE_API_KEY}`)
      .then(response => {
        this.listOfKeys = response.data.values[0]
        this.listOfItems = response.data.values.slice(1)
        this.listOfItems.forEach( item => {
          if (item.length < 7) {
            item.push('No tiene')
          }
          if (item.length > 6) {
            item.push(false)
            if (eval(appSettings.getString("favorites")).includes(item[0])) { item[7] = true }
            item[8] = true
          }
        });
        this.$refs.searchBar.nativeView.dismissSoftInput();
        this.isBusy = false
      })
      .catch(error => {
        console.log(error)
        this.errored = true
        this.errors = error
      })
    },

    favoriteItem(item) {
      console.log('startup: ', this.startupItems)
      
      
      // let newListOfItems = []
      // let indice = 0
      // item[7] = (item[7] === false) ? true : false
      // this.isFavorite = item[7]

      // if (this.isFavorite) {
      //   console.log('------SI ES FAVORITO------')
			// 	function onlyUnique(value, index, self) { 
      //       return self.indexOf(value) === index;
			// 	}
      //   this.favoriteStartups = eval(appSettings.getString("favorites"))
      //   this.favoriteStartups.push(item[0])
      //   this.favoriteStartups = this.favoriteStartups.filter( onlyUnique );
      //   appSettings.setString("favorites", JSON.stringify(this.favoriteStartups))        
      // } else {
      //   console.log('------NO ES FAVORITO------')
      //   const index = this.favoriteStartups.indexOf(item[0]);
      //   if (index > -1) {
      //     this.favoriteStartups.splice(index, 1);
      //   }
      // }
      
      // console.log('QUE PASO???', this.listOfItems[3][7])
      // function settingFavorite(element, index, array) {
      //   if (element[0] == item[0] ) {
      //     array[index][7]=item[7]
      //   }
      // }
      // this.listOfItems.forEach(settingFavorite);
      // this.listOfItems.forEach((startup, index) => {
      //   if (startup[0] == item[0] ) {
      //     // console.log(this.listOfItems[index][0], 'AQUI', item[0])
      //     indice = index
      //     this.listOfItems[index][7] = item[7]
      //     console.log('QUE PASO???', this.listOfItems[indice][7])
      //     return
      //   }
      // })
      // console.log(this.favoriteStartups)
    }

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