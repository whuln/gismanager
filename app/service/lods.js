'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class LodsService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'lods');
  }
  getLodsList(json = {}) {
    const { name, pageIndex, pageSize } = json;
    const query = new Query();
    query.like.name = name;   
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);
   
  }
  saveLods(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    // console.log('saveLods ')
    // console.log(json)
    this.colllection.add(json);
    return json.id;
  }
  deleteLods(id) {
    return this.colllection.delete({ id });
  }
  updateLods(json){
    const {id} = json;
    return this.colllection.update({id},json);
  }
};