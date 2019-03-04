import * as types from "./mutation-types";

const mutations = {
  [types.SET_ITEMS](state, items) {
    console.log("SET_ITEMS", items);
    state.items = items;
  },

  [types.FAVORITE_ITEM](state, item) {
    console.log("FAVORITE_ITEM", item);
    let itemToUpdate = state.items.find(startup => startup.name == item.name);
    Object.assign(itemToUpdate, item);
  },

  [types.UPDATE_ITEM](state, item) {
    console.log("UPDATE_ITEM", item);
    let itemToUpdate = state.items.find(startup => startup.name == item.name);
    Object.assign(itemToUpdate, item);
  },

  [types.DELETE_ITEM](state, item) {
    console.log("DELETE_ITEM", item);
    state.items.splice(
      state.items.findIndex(startup => startup.name == item.name),
      1
    );
  },

  [types.ADD_PROCESSING_TASK](state, task) {
    console.log("ADD_PROCESSING_TASK", task);
    state.processingTasks.push(task);
  },

  [types.REMOVE_PROCESSING_TASK](state, task) {
    console.log("REMOVE_PROCESSING_TASK", task);
    state.processingTasks.splice(state.processingTasks.indexOf(task), 1);
  }
};

export default mutations;
