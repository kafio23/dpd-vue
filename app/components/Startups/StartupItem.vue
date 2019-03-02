<template>
  <GridLayout columns="*, auto" class="item-container">
    <GridLayout columns="auto, *" col="0" orientation="horizontal" class="tap-target">
      <StackLayout>
        <Label :text="item.name" className="startupName" />
        <Label :text="item.solutionType" className="startupType" />
      </StackLayout>
    </GridLayout>
    <GridLayout col="1" class="favorite-container" @tap="toggleFavoriteItem">
      <StackLayout>
        <Image :src="item.favorite ? '~/assets/images/icon_star_filled.png' : '~/assets/images/icon_star_gray.png'" witdh="30"
					height="30" />
      </StackLayout>
    </GridLayout>
  </GridLayout>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    toggleFavoriteItem() {
      if (this.item.favorite) {
        this.$store.dispatch('toggleFavoriteItem', this.item)
        .catch( () => {
          alert("An error occurred managing your startup.");
        });
      }
      else {
        this.$store.dispatch('toggleFavoriteItem', this.item)
          .catch( () => {
            alert("An error occurred managing your startup.");
          });
      }
    },

    favoreItem() {
      this.$store.dispatch('favoriteItem', this.item)
        .catch(() => {
          alert("An error occurred managing your grocery list.");
        });
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../app-variables";

.item-container {
  padding-left: 10px;
  padding-right: 10px;
}

Label.startupName {
  font-size: 20px;
  color: $white;
  font-weight: bold;
}

Label.startupAddress {
	font-style: italic;
  font-size: 14px;
  font-weight: bold;
}

.favorite-container {
  align-items: center;
}
</style>