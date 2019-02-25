<template>
  <!-- <FlexboxLayout flexDirection="row" class="list-group-item">
    <Label :text="item[0]" />
  </FlexboxLayout> -->
  <StackLayout>
    <Label :text="item[0]" className="placeName" />
    <Label :text="item[2]" className="placeAddress" />
  </StackLayout>
  <!-- <GridLayout columns="*, auto" class="item-container">
    <GridLayout columns="auto, *" col="0" orientation="horizontal" class="tap-target" @tap="toggleDoneItem()">
      <Image src="~/assets/images/icon_password.png" class="startup-image" witdh="18"
              height="18" />
      <Label col="1" :text="item[0]"></Label>
    </GridLayout>
    <GridLayout col="1" class="delete-container" @tap="deleteItem()">
      <StackLayout>
        <Image src="res://delete"></Image>
      </StackLayout>
    </GridLayout>
  </GridLayout> -->
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
    toggleDoneItem() {
      console.log('apretaste Toggle')
    },
    deleteItem() {
      console.log('DeleteItem')
    }
  },
}
</script>

<style>
Label.placeName {
	font-size: 20px;
}

Label.placeAddress {
	font-style: italic;
	font-size: 13px;
}
</style>