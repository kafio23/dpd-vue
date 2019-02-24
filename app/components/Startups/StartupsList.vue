<template>
	<Page>
		<ActionBar title="Detail"/>
			<StackLayout>
        <ListView for="item in listOfItems" @itemTap="onItemTap">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <Label :text="item[0]" />
          </v-template>
        </ListView>
				<Button text="Back to Master" @tap="$navigateBack" />
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
      errors: []
    }
  },
	mounted() {
    console.log('LIST VIEW')
    axios
      .get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}!A1:G?key=${GOOGLE_API_KEY}`)
      .then(response => {
        console.log('DATOS recibidos')
        this.listOfKeys = response.data.values[0]
        this.listOfItems = response.data.values.slice(1)
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