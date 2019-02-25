<template>
	<Page>
    <ActionBar :title="item[0]"/>
		<StackLayout>
			<Label text="haha" />
			<Button text="Back" @tap="onButtonTap" item="ihadf" />
		</StackLayout>
	</Page>
</template>

<script>
export default {
	props: ['item'],

	mounted() {
		console.log('StartupView', this.item[0]);
	},

	methods: {
    onButtonTap({item}) {
      this.$navigateBack();
    }
  }
}
</script>
