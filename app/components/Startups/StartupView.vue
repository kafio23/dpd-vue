<template>
	<Page>
		<ActionBar :title="item[0]"/>
		<WrapLayout>
			<Image src="~/assets/images/icon_rocket_color.png" width="40%" height="30%" class="logo-image" />
			<Label text="Favorito" width="60%" height="30%" backgroundColor="#C8B8EB" class="favorite"/>

			<StackLayout  width="40%" height="50%" >
				<Label text="Tipos de solución: " class="key-title" />
				<Label text="País: " class="key-title" />
				<Label text="Fecha: " class="key-title" />
				<Label text="Link: " class="key-title" />
			</StackLayout>

			<StackLayout  width="40%" height="50%" >
				<Label :text="item[2]" class="key-value" />
				<Label :text="item[3]" class="key-value" />
				<Label :text="item[4]" class="key-value" />
				<Label :text="item[5]" class="key-value" />
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

<style>
.key-title {
	font-size: 15px;
	font-weight: 500;
	margin-bottom: 5px;
}
.key-value {
	font-size: 15px;
	margin-bottom: 5px;
}
.logo-image {
  width: 100;
  margin-bottom: 20;
}
.favorite {
	color: #FFFF69;
	font-size: 20px;
	font-weight: 500;
}
</style>
