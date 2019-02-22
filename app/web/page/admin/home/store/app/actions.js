'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import request from 'framework/network/request';

Vue.use(Vuex);

const actions = {

  SET_ARTICLE_LIST: (store, json) => {
    return request.post('/admin/api/article/list', json, store).then(response => {
      store.commit(Type.SET_ARTICLE_LIST, response.data);
    });
  },
  SET_ARTICLE_DETAIL: (store, { id }) => {
    const { commit, dispatch, state } = store;
    return request.get(`/admin/api/article/${id}`, store)
      .then(response => {
        commit(Type.SET_ARTICLE_DETAIL, response.data);
      });
  },
  SET_SAVE_ARTICLE: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/admin/api/article/add', json, store).then(response => {
      commit(Type.SET_SAVE_ARTICLE, json);
    });
  },
  DELETE_ARTICLE: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/admin/api/article/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_ARTICLE, { id });
      });
  },
  SET_RD_LIST: (store, json) => {
    return request.post('/admin/api/rd/list', json, store).then(response => {
      // console.log(response.data);
      store.commit(Type.SET_RD_LIST, response.data); 
    });
  },
  SET_SAVE_RD: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/admin/api/rd/add', json, store).then(response => {
      commit(Type.SET_SAVE_RD, json);
    });
  },  
  SET_MAPLAYER_LIST: (store, json) => {
    return request.post('/api/maplayer/list', json, store).then(response => {
      // console.log(response.data);
      store.commit(Type.SET_MAPLAYER_LIST, response.data); 
    });
  },
  SET_SAVE_MAPLAYER: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/api/maplayer/add', json, store).then(response => {
      commit(Type.SET_SAVE_MAPLAYER, json);
    });
  },
  DELETE_MAPLAYER: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/api/maplayer/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_MAPLAYER, { id });
      });
  },
  UPDATE_MAPLAYER: (store, json) => {
    return request.post('/api/maplayer/update', json, store).then(response => {      
      // store.commit(Type.SET_MAPLAYER_LIST, response.data); 
    });
  },
  SET_BASEMAP_LIST: (store, json) => {
    return request.post('/api/basemap/list', json, store).then(response => {
      // console.log(response.data);
      store.commit(Type.SET_BASEMAP_LIST, response.data); 
    });
  },
  SET_SAVE_BASEMAP: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/api/basemap/add', json, store).then(response => {
      commit(Type.SET_SAVE_BASEMAP, json);
    });
  },
  DELETE_BASEMAP: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/api/basemap/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_BASEMAP, { id });
      });
  },
  UPDATE_BASEMAP: (store, json) => {
    return request.post('/api/basemap/update', json, store).then(response => {      
      // store.commit(Type.SET_BASEMAP_LIST, response.data); 
    });
  },
  SET_MAP_LIST: (store, json) => {
    return request.post('/api/map/list', json, store).then(response => {
      // console.log(response.data);
      store.commit(Type.SET_MAP_LIST, response.data); 
    });
  },
  SET_SAVE_MAP: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/api/map/add', json, store).then(response => {
      commit(Type.SET_SAVE_MAP, json);
    });
  },
  DELETE_MAP: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/api/map/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_MAP, { id });
      });
  },
  UPDATE_MAP: (store, json) => {
    return request.post('/api/map/update', json, store).then(response => {
      // store.commit(Type.SET_MAP_LIST, response.data); 
    });
  },
  SET_SERVICE_LIST: (store, json) => {
    return request.post('/api/service/list', json, store).then(response => {
      // console.log(response.data);
      store.commit(Type.SET_SERVICE_LIST, response.data); 
    });
  },
  SET_SAVE_SERVICE: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/api/service/add', json, store).then(response => {
      commit(Type.SET_SAVE_SERVICE, json);
    });
  },
  DELETE_SERVICE: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/api/service/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_SERVICE, { id });
      });
  },
  UPDATE_SERVICE: (store, json) => {
    return request.post('/api/service/update', json, store).then(response => {
      // store.commit(Type.SET_SERVICE_LIST, response.data); 
    });
  },
  SET_LODS_LIST: (store, json) => {
    return request.post('/api/lods/list', json, store).then(response => {
      // console.log(response.data);
      store.commit(Type.SET_LODS_LIST, response.data); 
    });
  },
  SET_SAVE_LODS: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/api/lods/add', json, store).then(response => {
      commit(Type.SET_SAVE_LODS, json);
    });
  },
  DELETE_LODS: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/api/lods/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_LODS, { id });
      });
  },
  UPDATE_LODS: (store, json) => {
    return request.post('/api/lods/update', json, store).then(response => {
      // store.commit(Type.SET_LODS_LIST, response.data); 
    });
  }
};

export default actions;