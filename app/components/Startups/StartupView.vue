<template>
	<Page>
		<ActionBar :title="item[0]"/>
		<WrapLayout>
			<Image src="~/assets/images/icon_rocket_color.png" width="40%" height="30%" class="logo-image" />
			
			<StackLayout  width="60%" height="30%" >
				<FlexboxLayout style="padding-bottom:10px;">
					<Image src="~/assets/images/icon_star.png" witdh="18"
					height="18" />
					<Label text="Favorito" class="favorite"/>
				</FlexboxLayout>
				<FlexboxLayout alignSelf="center" >
					<Label width="45%" :text="item[2]" class="key-title tag" />
					<Label width="45%" :text="item[1]" class="key-title tag" />
				</FlexboxLayout>
			</StackLayout>
			
			<StackLayout  width="40%" height="50%" >
				<Label text="País: " class="key-title" />
				<Label text="Fecha: " class="key-title" />
				<Label text="Link: " class="key-title" />
				<Label text="Universidad: " class="key-title" />
			</StackLayout>

			<StackLayout  width="40%" height="50%" >
				<Label :text="item[3]" class="key-value" />
				<Label :text="item[4]" class="key-value" />
				<Label :text="item[5]" class="key-value" />
				<Label :text="item[6]" class="key-value" />
			</StackLayout>

			<StackLayout  width="40%" height="50%" class="container">
				<Button text="Volver a Lista" @tap="onButtonTap" />
			</StackLayout>
		</WrapLayout>
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

<style scoped lang="scss">
@import "../../app-variables";

.key-title {
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 10px;
	padding-left: 10px;
}
.key-value {
	font-size: 16px;
	margin-bottom: 10px;
}
.logo-image {
  width: 100;
  margin-bottom: 20;
}
.favorite {
	color: #f1c40f;
	font-size: 20px;
	font-weight: 500;
}
.tag{
	background-color: #8E6DD7;
	color: $white;
	font-weight: bold;
	border-radius: 20;
  padding-top: 5;
	padding-bottom: 5;
	text-align: center;
	padding-left: 3;
	margin-right: 5;
}
</style>
