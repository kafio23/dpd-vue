<template>
	<Page>
		<ActionBar title="Startups"/>
			<StackLayout class="list-panel">
        <ListView for="item in listOfItems" @itemTap="onItemTap" style="height:300px">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <FlexboxLayout flexDirection="row" class="list-group-item">
              <Label :text="item[0]" />
            </FlexboxLayout>
          </v-template>
        </ListView>
				
        <Button text="Back to Master" @tap="$navigateBack" />
        
        <ActivityIndicator :busy="isBusy"></ActivityIndicator>
			</StackLayout>
	</Page>
</template>

<script>

import axios from 'axios';

const GOOGLE_API_KEY = process.env.VUE_APP_KEY;
const spreadsheetId = process.env.VUE_APP_SHEET;
const range = 'Sheet1';

export default {
  data() {
    return {
      listOfKeys: [],
      listOfItems: [],
      isBusy: true,
      errors: []
    }
  },
	mounted() {
    console.log('LIST VIEW')
    axios
      .get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}!A1:G?key=${GOOGLE_API_KEY}`)
      .then(response => {
        this.listOfKeys = response.data.values[0]
        this.listOfItems = response.data.values.slice(1)
        this.listOfItems.forEach( item => {
          if (item.length < 7) {
            item.push(false)
          }
        });
        this.isBusy = false
      })
      .catch(error => {
        console.log(error)
        this.errored = true
        this.errors = error
      })
  }
}
</script>

<style>
</style>