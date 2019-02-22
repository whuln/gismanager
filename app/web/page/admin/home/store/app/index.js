'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default function createStore(initState) {
  const state = {  
    articleTotal: 0,
    articleList: [],
    article: {},
    rdTotal:0,
    rdList:[],    
    resourceType:[],
    maplyrList:[],
    maplyrTotal:0,
    basemapList:[],
    basemapTotal:0,
    mapList:[],
    mapTotal:0,
    serviceList:[],
    serviceTotal:0,
    lodsList:[],
    lodsTotal:0,
    ...initState
  };
  return new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  });
}