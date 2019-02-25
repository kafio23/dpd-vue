<template>
	<Page>
    <ActionBar title="Another"/>
		<StackLayout>
			<Label :text="this.item" />
			<Button text="Back" @tap="onButtonTap" />
		</StackLayout>
	</Page>
</template>

<script>
export default {
	props: {
    item: {
      type: String,
      required: true,
    }
  },
};
</script>