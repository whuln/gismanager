'use strict';
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.index.index.index);
  router.get('/(/.+)?', controller.admin.admin.home);  
  router.get('/client', controller.index.index.client);
  router.get('/list', controller.index.index.list);
  router.get('/category', controller.category.category.index);
  router.get('/login', controller.admin.admin.login);
  router.post('/admin/api/article/list', controller.admin.admin.list);
  router.post('/admin/api/article/add', controller.admin.admin.add);
  router.get('/admin/api/article/del/:id', controller.admin.admin.del);
  router.get('/admin/api/article/:id', controller.admin.admin.detail);
  // router.get('/admin(/.+)?', controller.admin.admin.home);

  //resource defination 
  router.post('/admin/api/rd/list', controller.admin.resource.rd_list);
  router.post('/admin/api/rd/add', controller.admin.resource.add_rd);

  //maplayer methods
  router.post('/api/maplayer/list', controller.admin.resource.maplayer_list);
  router.post('/api/maplayer/add', controller.admin.resource.add_maplayer);
  router.get('/api/maplayer/del/:id', controller.admin.resource.del_maplayer);
  router.post('/api/maplayer/update', controller.admin.resource.update_maplayer);

  //basemap methods
  router.post('/api/basemap/list', controller.admin.resource.basemap_list);
  router.post('/api/basemap/add', controller.admin.resource.add_basemap);
  router.get('/api/basemap/del/:id', controller.admin.resource.del_basemap);
  router.post('/api/basemap/update', controller.admin.resource.update_basemap);

  //map methods
  router.post('/api/map/list', controller.admin.resource.map_list);
  router.post('/api/map/add', controller.admin.resource.add_map);
  router.get('/api/map/del/:id', controller.admin.resource.del_map);
  router.post('/api/map/update', controller.admin.resource.update_map);

  //service methods
  router.post('/api/service/list', controller.admin.resource.service_list);
  router.post('/api/service/add', controller.admin.resource.add_service);
  router.get('/api/service/del/:id', controller.admin.resource.del_service);
  router.post('/api/service/update', controller.admin.resource.update_service);

   //lods methods
   router.post('/api/lods/list', controller.admin.resource.lods_list);
   router.post('/api/lods/add', controller.admin.resource.add_lods);
   router.get('/api/lods/del/:id', controller.admin.resource.del_lods);
   router.post('/api/lods/update', controller.admin.resource.update_lods);
  //当路径找不到时，最后映射到主路径，映射为vue-router内部路径。
  router.get('/*', controller.admin.admin.home);
};