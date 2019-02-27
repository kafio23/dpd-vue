<template>
	<Page>
		<ActionBar title="Startups"/>
      <WrapLayout backgroundColor="#2cb5e8" class="main-list">
			<!-- <StackLayout class="list-panel"> -->
        <SearchBar width="100%" height="10%" ref="searchBar" @clear="onClear" hint="Buscar..."
        v-model="searchText" @textChange="onTextChanged" @submit="onSubmit" class="search-bar" />

        <ListView width="100%" height="70%" for="item in listOfItems" @itemTap="onItemTap" style="height:300px">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <!-- <StackLayout :visibility="item[8] ? 'visible' : 'collapsed'"> -->
            <StartupItem ref="startupItem" :item="item" ></StartupItem>
            <!-- </StackLayout> -->
          </v-template>
        </ListView>
				
        <Button width="100%" height="10%" text="Back to Master" @tap="$navigateBack" />
        
        <ActivityIndicator width="100%" height="10%" :busy="isBusy"></ActivityIndicator>
			<!-- </StackLayout> -->
      </WrapLayout>
	</Page>
</template>

<script>

import StartupView from './StartupView.vue'
import StartupItem from './StartupItem.vue'

import axios from 'axios';
// import favorites from '@/assets/data/favorites.json'
const appSettings = require("application-settings");

const GOOGLE_API_KEY = process.env.VUE_APP_KEY;
const spreadsheetId = process.env.VUE_APP_SHEET;
const range = 'Sheet1';

export default {
  components: {
    StartupItem
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
    this.$forceUpdate()
    console.log('LIST VIEW')
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

  methods: {
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
          console.log(i, this.listOfItems[i])
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