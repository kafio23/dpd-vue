import * as types from "./mutation-types";
import StartupService from "@/services/StartupService";

const startupService = new StartupService();

export const loadItems = (
  { commit },
  params = { searchText: "", byType: 0 }
) => {
  const task = "action loadItems";
  console.log(task);
  if (params.searchText) {
    return new Promise((resolve, reject) => {
      commit(types.ADD_PROCESSING_TASK, task);
      startupService
        .load({ searchText: params.searchText, byType: params.byType })
        .then(items => {
          commit(types.SET_ITEMS, items);
          commit(types.REMOVE_PROCESSING_TASK, task);
          resolve();
        })
        .catch(error => {
          console.error(`Error loading items from the backend: ${error}.`);
          commit(types.REMOVE_PROCESSING_TASK, task);
          reject(error);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      commit(types.ADD_PROCESSING_TASK, task);
      startupService
        .load()
        .then(items => {
          commit(types.SET_ITEMS, items);
          commit(types.REMOVE_PROCESSING_TASK, task);
          resolve();
        })
        .catch(error => {
          console.error(`Error loading items from the backend: ${error}.`);
          commit(types.REMOVE_PROCESSING_TASK, task);
          reject(error);
        });
    });
  }
};

export const updateItem = ({ commit }, item) => {
  const task = "action updateItem";
  return new Promise((resolve, reject) => {
    commit(types.ADD_PROCESSING_TASK, task);
    startupService
      .update(item)
      .then(item => {
        commit(types.UPDATE_ITEM, item);
        commit(types.REMOVE_PROCESSING_TASK, task);
        resolve(item);
      })
      .catch(error => {
        console.error(`Error setting updating Item in the backend: ${error}.`);
        commit(types.REMOVE_PROCESSING_TASK, task);
        reject(error);
      });
  });
};

export const toggleFavoriteItem = ({ commit }, item) => {
  console.log("action toggleFavoriteItem");
  return updateItem({ commit }, { ...item, favorite: !item.favorite });
};

export const deleteItem = ({ commit }, item) => {
  const task = "action deleteItem";
  console.log(task);
  if (item.deleted) {
    // if soft deleted, delete permanently from backend
    commit(types.ADD_PROCESSING_TASK, task);
    return new Promise((resolve, reject) => {
      startupService
        .delete(item)
        .then(item => {
          commit(types.DELETE_ITEM, item);
          commit(types.REMOVE_PROCESSING_TASK, task);
          resolve(item);
        })
        .catch(error => {
          console.error(
            `Error deleting Itempermanently in the backend: ${error}.`
          );
          commit(types.REMOVE_PROCESSING_TASK, task);
          reject(error);
        });
    });
  } else {
    // 'soft' delete
    return updateItem({ commit }, { ...item, deleted: true });
  }
};
