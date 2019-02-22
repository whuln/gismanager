'use strict';

import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE,
  SET_RD_LIST,
  SET_SAVE_RD,
  SET_MAPLAYER_LIST,
  SET_SAVE_MAPLAYER,
  DELETE_MAPLAYER,
  SET_BASEMAP_LIST,
  SET_SAVE_BASEMAP,
  DELETE_BASEMAP,
  SET_MAP_LIST,
  SET_SAVE_MAP,
  DELETE_MAP,
  SET_SERVICE_LIST,
  SET_SAVE_SERVICE,
  DELETE_SERVICE,
  SET_LODS_LIST,
  SET_SAVE_LODS,
  DELETE_LODS
} from './mutation-type';

const mutations = {  
  [SET_ARTICLE_LIST](state, { list, total }) {
    state.articleTotal = total;
    state.articleList = list;
  },
  [SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  },
  [SET_SAVE_ARTICLE](state, data) {
    state.articleTotal += 1;
    state.articleList = [data].concat(state.articleList);
  },
  [DELETE_ARTICLE](state, { id }) {
    state.articleTotal -= 1;
    state.articleList = state.articleList.filter(item => {
      return item.id !== id;
    });
  },
  [SET_RD_LIST](state, { list, total }) {
    state.rdTotal = total;
    state.rdList = list;
  },
  [SET_SAVE_RD](state, data) {
    state.rdTotal += 1;
    state.rdList = [data].concat(state.rdList);
  },
  [SET_MAPLAYER_LIST](state, { list, total }) {
    state.maplyrTotal = total;
    state.maplyrList = list;
  },
  [SET_SAVE_MAPLAYER](state, data) {
    state.maplyrTotal += 1;
    state.maplyrList = [data].concat(state.maplyrList);
  },
  [DELETE_MAPLAYER](state,{ id }){
    state.maplyrTotal -= 1;
    state.maplyrList = state.maplyrList.filter(item => {
      return item.id !== id;
    });
  },
  [SET_BASEMAP_LIST](state, { list, total }) {
    state.basemapTotal = total;
    state.basemapList = list;
  },
  [SET_SAVE_BASEMAP](state, data) {
    state.basemapTotal += 1;
    state.basemapList = [data].concat(state.basemapList);
  },
  [DELETE_BASEMAP](state,{ id }){
    state.mapTotal -= 1;
    state.mapList = state.mapList.filter(item => {
      return item.id !== id;
    });
  },
  [SET_MAP_LIST](state, { list, total }) {
    state.mapTotal = total;
    state.mapList = list;
  },
  [SET_SAVE_MAP](state, data) {
    state.mapTotal += 1;
    state.mapList = [data].concat(state.mapList);
  },
  [DELETE_MAP](state,{ id }){
    state.mapTotal -= 1;
    state.mapList = state.mapList.filter(item => {
      return item.id !== id;
    });
  },
  [SET_SERVICE_LIST](state, { list, total }) {
    state.serviceTotal = total;
    state.serviceList = list;
  },
  [SET_SAVE_SERVICE](state, data) {
    state.serviceTotal += 1;
    state.serviceList = [data].concat(state.serviceList);
  },
  [DELETE_SERVICE](state,{ id }){
    state.serviceTotal -= 1;
    state.serviceList = state.serviceList.filter(item => {
      return item.id !== id;
    });
  },
  [SET_LODS_LIST](state, { list, total }) {
    state.lodsTotal = total;
    state.lodsList = list;
  },
  [SET_SAVE_LODS](state, data) {
    state.lodsTotal += 1;
    state.lodsList = [data].concat(state.lodsList);
  },
  [DELETE_LODS](state,{ id }){
    state.lodsTotal -= 1;
    state.lodsList = state.lodsList.filter(item => {
      return item.id !== id;
    });
  }
};
export default mutations;
