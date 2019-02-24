<template>
	<Page>
		<ActionBar title="Detail"/>
			<StackLayout>
				<Button text="Back to Master" @tap="$navigateBack" />
			</StackLayout>
	</Page>
</template>

<script>

import axios from 'axios';

const GOOGLE_API_KEY = process.env.VUE_APP_KEY;
const spreadsheetId = '1KSe1V27k_RY4cE7gIcUJD0Kaca9uRyQKNdoTLLVisj0';
const range = 'Sheet1';

export default {
	mounted() {
    axios
      .get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}!A1:G?key=${GOOGLE_API_KEY}`)
      .then(response=>{
        console.log('recibi!')
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  }
}
</script>

<style>
</style>