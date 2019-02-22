'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class BasemapService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'basemap');
  }
  getBasemapList(json = {}) {
    const { title, description, key, pageIndex, pageSize } = json;
    const query = new Query();
    query.like.title = title;
    query.like.description = description;
    query.like.key = key;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);
   
  }
  saveBasemap(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    // console.log('saveBasemap ')
    // console.log(json)
    this.colllection.add(json);
    return json.id;
  }
  deleteBasemap(id) {
    return this.colllection.delete({ id });
  }
  updateBasemap(json){
    const {id} = json;
    return this.colllection.update({id},json);
  }
};