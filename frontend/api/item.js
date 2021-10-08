import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

// from userID, get all the items the user created
export const getItemByUserId = (userId) => request.get('/api/item/')
  .query({ owner: userId })
  .then(handleSuccess)
  .catch(handleError);

export const getItemByItemId = (itemId) => request.get(`/api/item/${itemId}`)
  // .query({ item_id: item_id })
  .then(handleSuccess)
  .catch(handleError);

export const getItemChild = (itemPath) => request.get('/api/item')
  .query({ path: itemPath })
  .then(handleSuccess)
  .catch(handleError);

export const getRecommendItem = (id) => request.get('/api/recommend')
  .query({ userId: id })
  .then(handleSuccess)
  .catch(handleError);

export const algoliaSearch = (query) => request.get('/api/item/algolia')
  .query({ query })
  .then(handleSuccess)
  .catch(handleError);

export const updateItem = (itemId, object) => request.put(`/api/item/${itemId}`)
  .send(object)
  .then(handleSuccess)
  .catch(handleError);
