<template>
  <WrapLayout class="item-container">
    <FlexboxLayout width="75%" flexDirection="column">
      <Label :text="item.name" class="startupName"/>
      <Label :text="item.solutionType" class="startupType"/>
    </FlexboxLayout>
    <GridLayout width="20%" height="30%" class="favorite-container" @tap="toggleFavoriteItem">
      <Image
        :src="item.favorite ? '~/assets/images/icon_star_filled.png' : '~/assets/images/icon_star_gray.png'"
        witdh="30"
        height="30"
      />
    </GridLayout>
  </WrapLayout>
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
        this.$store.dispatch("toggleFavoriteItem", this.item).catch(() => {
          alert("An error occurred managing your startup.");
        });
      } else {
        this.$store.dispatch("toggleFavoriteItem", this.item).catch(() => {
          alert("An error occurred managing your startup.");
        });
      }
    },

    favoreItem() {
      this.$store.dispatch("favoriteItem", this.item).catch(() => {
        alert("An error occurred managing your Startup list.");
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../app-variables";

label.startupName {
  font-size: 20px;
  color: #2cb5e8;
  font-weight: bold;
}

label.startupType {
  font-style: italic;
  font-size: 14px;
  font-weight: bold;
}

.favorite-container {
  align-items: center;
}
</style>