'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class MaplayerService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'maplayer');
  }
  getMaplayerList(json = {}) {
    const { title, description, url, pageIndex, pageSize } = json;
    const query = new Query();
    query.like.title = title;
    query.like.description = description;
    query.like.url = url;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);   
  }
  saveMaplayer(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    // console.log('saveMaplayer ')
    // console.log(json)
    this.colllection.add(json);
    return json.id;
  }
  deleteMaplayer(id) {
    return this.colllection.delete({ id });
  }
  updateMaplayer(json){
    const {id} = json;
    return this.colllection.update({id},json);
  }
};