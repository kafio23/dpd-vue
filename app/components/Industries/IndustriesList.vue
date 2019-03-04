<template>
  <Page actionBarHidden="true">
    <StackLayout @loaded="load()">
      <FlexboxLayout alignItems="center" height="10%" class="action-bar-costume">
        <GridLayout width="10%" @tap="goBack">
          <Image src="~/assets/images/icon_left.png" witdh="30" height="30"/>
        </GridLayout>
        <NavigationButton
          width="10%"
          text="Go back"
          android.systemIcon="ic_menu_back"
          @tap="goBack"
        />
        <Label width="70%" text="Industrias"></Label>
        <GridLayout width="20%" @tap="showMenu" class="menu-button-container">
          <Image src="~/assets/images/icon_menu.png" witdh="30" height="30"/>
        </GridLayout>
      </FlexboxLayout>

      <ListView
        :visibility="isBusy ? 'collapsed' : 'visible'"
        height="90%"
        for="industry in industryItems"
        @itemTap="onItemTap"
      >
        <v-template>
          <WrapLayout class="item-container">
            <FlexboxLayout flexDirection="column">
              <Label :text="industry.name" class="startupName"/>
              <Label :text="industry.num" class="startupType"/>
            </FlexboxLayout>
          </WrapLayout>
        </v-template>
      </ListView>

      <ActivityIndicator
        :visibility="isBusy ? 'visible' : 'collapsed'"
        width="100%"
        height="10%"
        :busy="isBusy"
      ></ActivityIndicator>
    </StackLayout>
  </Page>
</template>

<script>
import Login from "@/components/Login";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { industriesList, itemList } from "~/store/getters";
import IndustryStartups from "./IndustryStartups.vue";

export default {
  computed: {
    ...mapGetters({
      itemList: "itemList",
      isLoading: "isProcessing"
    }),

    startupItems: function() {
      return this.itemList;
    },

    industryItems: function() {
      let industries = [];
      let industryNames = [];
      let num = 0;

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      this.startupItems.forEach(element => {
        industries.push({ name: element.industry, num: 0 });
      });

      var sortByProperty = function(property) {
        return function(x, y) {
          return x[property] === y[property]
            ? 0
            : x[property] > y[property]
            ? 1
            : -1;
        };
      };
      industries.sort(sortByProperty("name"));
      var current = "";
      var cnt = 0;
      for (var i = 0; i < industries.length; i++) {
        if (industries[i].name != current) {
          if (cnt > 0) {
            console.log(current + " comes --> " + cnt + " times<br>");
            industryNames.push({ name: current, num: cnt });
          }
          current = industries[i].name;
          cnt = 1;
        } else {
          cnt++;
        }
      }
      if (cnt > 0) {
        console.log(current + " comes --> " + cnt + " times");
        industryNames.push({ name: current, num: cnt });
      }
      return industryNames;
    }
  },

  data() {
    return {
      isBusy: true
    };
  },

  mounted() {},

  methods: {
    ...mapActions(["loadItems"]),

    goBack() {
      this.$navigateBack();
    },

    load() {
      this.loadItems()
        .then(() => {
          this.isBusy = false;
        })
        .catch(error => {
          console.error(error);
          alert("An error occurred loading your Startup list.");
        });
    },

    showMenu() {
      action({
        message: "¿Deseas salir?",
        actions: ["Log Off"],
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result === "Log Off") {
          this.logout();
        }
      });
    },

    logout: function() {
      this.$navigateTo(Login);
    },

    onItemTap({ item }) {
      this.$navigateTo(IndustryStartups, { props: { industry: item } });
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>