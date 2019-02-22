'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class ResourcedefinationService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'resource_defination');
  }
  getRdList(json = {}) {
    const { resourceName, pageIndex, pageSize } = json;
    const query = new Query();
    query.like.resourceName = resourceName;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);
    // return {
    //   total:1,
    //   list:[{name:'地图图层服务', fields:'URL,NAME'}]
    // }
  }
  saveRd(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    console.log('saveRd ')
    console.log(json)
    this.colllection.add(json);
    return json.id;
  }
  deleteRd(id) {
    return this.colllection.delete({ id });
  }
};