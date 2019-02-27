<template>
  <GridLayout columns="*, auto" class="item-container">
    <GridLayout columns="auto, *" col="0" orientation="horizontal" class="tap-target">
      <StackLayout>
        <Label :text="item[0]" className="placeName" />
        <Label :text="item[2]" className="placeAddress" />
      </StackLayout>
    </GridLayout>
    <GridLayout col="1" class="delete-container" @tap="deleteItem()">
      <StackLayout>
        <Image :src="item[7] ? '~/assets/images/icon_star_filled.png' : '~/assets/images/icon_star_gray.png'" witdh="18"
					height="18" />
          <!-- <Image src="~/assets/images/icon_star_gray.png" witdh="18"
					height="18" /> -->
      </StackLayout>
    </GridLayout>
  </GridLayout>
</template>

<script>
import favorites from '@/assets/data/favorites.json'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    toggleDoneItem() {
      console.log('apretaste Toggle')
    },
    deleteItem() {
      console.log('DeleteItem')
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../app-variables";

Label.placeName {
  font-size: 20px;
  color: $white;
  font-weight: bold;
}

Label.placeAddress {
	font-style: italic;
  font-size: 14px;
  font-weight: bold;
}
</style>