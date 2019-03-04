export const itemList = state => {
  return state.items;
};

export const favoriteItemList = state => {
  return state.items.filter(item => item.favorite);
};

export const deletedItemList = state => {
  return state.items.filter(item => item.deleted);
};

export const isProcessing = state => {
  return state.processingTasks.length >= 1;
};
