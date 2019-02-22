'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class ServiceService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'service');
  }
  getServiceList(json = {}) {
    const { name, url, pageIndex, pageSize } = json;
    const query = new Query();
    query.like.name = name;
    query.like.url = url;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);
   
  }
  saveService(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    // console.log('saveService ')
    // console.log(json)
    this.colllection.add(json);
    return json.id;
  }
  deleteService(id) {
    return this.colllection.delete({ id });
  }
  updateService(json){
    const {id} = json;
    return this.colllection.update({id},json);
  }
};