const menu = {
  // home: {
  //   name: 'menu.home',
  //   path: '/',
  //   icon: 'el-icon-menu',
  // },
  content: {
    name: 'menu.resourcemanage',
    icon: 'el-icon-document',
    children: {
      maplayermanage: {
        name: 'menu.maplayermanage',
        icon: 'el-icon-upload',
        path: '/maplayermanage'
      },
      basemapmanage: {
        name: 'menu.basemapmanage',
        icon: 'el-icon-edit-outline',       
        path:'/basemapmanage'
      },
      mapmanage: {
        name: 'menu.mapmanage',
        icon: 'el-icon-edit-outline',
        path: '/mapmanage'
      },
      servicemanage: {
        name: 'menu.servicemanage',      
        path: '/servicemanage'
      },
      lodsmanage: {
        name: 'menu.lodsmanage',        
        path: '/lodsmanage'
      }
    }
  },

};

export default menu;