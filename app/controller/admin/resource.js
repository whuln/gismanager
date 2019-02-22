'use strict';
const egg = require('egg');
module.exports = class ResourceController extends egg.Controller {
  async rd_list(ctx) {
    this.ctx.body = ctx.service.resourcedefination.getRdList(ctx.request.body);    
  }
  async add_rd(ctx) {
    ctx.body = this.service.resourcedefination.saveRd(ctx.request.body);
  }
  async del_rd(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.resourcedefination.deleteRd(id);
  }
  // async detailRd(ctx) {
  //   const id = ctx.query.id;
  //   ctx.body = {};
  // }

  //maplayer methods 
  async maplayer_list(ctx) {
    this.ctx.body = ctx.service.maplayer.getMaplayerList(ctx.request.body); 
  }
  async add_maplayer(ctx) {
    ctx.body = this.service.maplayer.saveMaplayer(ctx.request.body);
  }
  async del_maplayer(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.maplayer.deleteMaplayer(id);
  }
  async update_maplayer(ctx){
    ctx.body = ctx.service.maplayer.updateMaplayer(ctx.request.body); 
  }

  //maplayer methods 
  async basemap_list(ctx) {
    this.ctx.body = ctx.service.basemap.getBasemapList(ctx.request.body); 
  }
  async add_basemap(ctx) {
    ctx.body = this.service.basemap.saveBasemap(ctx.request.body);
  }
  async del_basemap(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.basemap.deleteBasemap(id);
  }
  async update_basemap(ctx){
    ctx.body = ctx.service.basemap.updateBasemap(ctx.request.body); 
  }

  //map methods 
  async map_list(ctx) {
    this.ctx.body = ctx.service.map.getMapList(ctx.request.body); 
  }
  async add_map(ctx) {
    ctx.body = this.service.map.saveMap(ctx.request.body);
  }
  async del_map(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.map.deleteMap(id);
  }
  async update_map(ctx){
    ctx.body = ctx.service.map.updateMap(ctx.request.body); 
  }

   //service methods 
   async service_list(ctx) {
    this.ctx.body = ctx.service.service.getServiceList(ctx.request.body); 
  }
  async add_service(ctx) {
    ctx.body = this.service.service.saveService(ctx.request.body);
  }
  async del_service(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.service.deleteService(id);
  }
  async update_service(ctx){
    ctx.body = ctx.service.service.updateService(ctx.request.body); 
  }

   //lods methods 
   async lods_list(ctx) {
    this.ctx.body = ctx.service.lods.getLodsList(ctx.request.body); 
  }
  async add_lods(ctx) {
    ctx.body = this.service.lods.saveLods(ctx.request.body);
  }
  async del_lods(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.lods.deleteLods(id);
  }
  async update_lods(ctx){
    ctx.body = ctx.service.lods.updateLods(ctx.request.body); 
  }
};