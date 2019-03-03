<template>
	<Page actionBarHidden="true">
		<!-- <ActionBar :title="item.name">
			<NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
		</ActionBar> -->
		<WrapLayout>
			<FlexboxLayout alignItems="center" width="100%" height="10%" class="action-bar-costume">
				<GridLayout width="10%"  @tap="goBack">
					<Image src="~/assets/images/icon_left.png" witdh="30" height="30" />
				</GridLayout>
				<NavigationButton width="10%" text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
				<Label width="70%" :text="`Startup ${item.name}`"></Label>
				<GridLayout width="20%" @tap="showMenu" class='menu-button-container'>
					<Image src="~/assets/images/icon_menu.png" witdh="30" height="30" />
				</GridLayout>
			</FlexboxLayout>
			
			<WrapLayout height="90%"  class="startup-header" >
				<Image src="~/assets/images/icon_rocket_color.png" width="40%" height="30%" class="logo-image" />
				
				<StackLayout  width="60%" height="30%">
					<FlexboxLayout style="padding-bottom:10px;">
						<Image :src="item.favorite ? '~/assets/images/icon_star_filled.png' : '~/assets/images/icon_star_gray.png'" witdh="18"
						height="18" />
						<Label text="Favorito" :class="item.favorite ? 'favorite':'no-favorite'"/>
					</FlexboxLayout>
					<FlexboxLayout alignSelf="center" >
						<Label width="45%" :text="item.solutionType" class="tag" />
						<Label width="45%" :text="item.industry" class="tag" />
					</FlexboxLayout>
				</StackLayout>
				
				<StackLayout  width="40%" height="50%" >
					<Label text="País: " class="key-title" />
					<Label text="Fecha: " class="key-title" />
					<Label text="Link: " class="key-title" />
					<Label text="Universidad: " class="key-title" />
				</StackLayout>

				<StackLayout  width="40%" height="50%" >
					<Label :text="item.country" class="key-value" />
					<Label :text="item.contractDate" class="key-value" />
					<Label :text="item.web" class="key-value" />
					<Label :text="item.university" class="key-value" />
				</StackLayout>

				<!-- <StackLayout  width="40%" height="50%" class="container">
					<Button text="Volver a Lista" @tap="onButtonTap" />
				</StackLayout> -->
			</WrapLayout>
		</WrapLayout>
	</Page>
</template>

<script>
import StartupsList from './StartupsList.vue'
const appSettings = require("application-settings");

export default {
	props: ['item'],

	data() {
    return {
    }
  },

	mounted() {
	},

	methods: {
		goBack() {
			this.$navigateBack();
		},
    onButtonTap({item}) {
			this.$navigateBack();
			// this.$navigateTo(StartupsList);
		},
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
.no-favorite {
	color: #cccccc;
	font-size: 20px;
	font-weight: 500;
}
.tag{
	font-size: 16px;
	background-color: #8E6DD7;
	color: $white;
	font-weight: bold;
	border-radius: 20;
  padding-top: 5;
	padding-bottom: 5;
	text-align: center;
	margin-right: 5;
}
.startup-header {
	padding-top: 5rem;
}
</style>
