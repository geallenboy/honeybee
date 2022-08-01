import { getRouters } from '@/api/menu';
import { constantRoutes, dynamicRoutes } from '@/router';
import { filterAsyncRouter, filterDynamicRoutes } from '@/utils/permission';

import { defineModel } from 'foca';

interface permissionStateProps {
  routes: any[];
  addRoutes: any[];
  defaultRoutes: any[];
  topbarRouters: any[];
  sidebarRouters: any[];
}
const initialState: permissionStateProps = {
  routes: [],
  addRoutes: [],
  defaultRoutes: [],
  topbarRouters: [],
  sidebarRouters: []
};

export const permissionModel = defineModel('permission', {
  initialState,
  actions: {
    setRoutes(state, routes: any[]) {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    setDefaultRoutes(state, routes: any[]) {
      state.defaultRoutes = constantRoutes.concat(routes);
    },
    setTopbarRoutes(state, routes: never[]) {
      state.topbarRouters = routes;
    },
    setSidebarRouters(state, routes: any[]) {
      state.sidebarRouters = routes;
    }
  },
  effects: {
    generateRoutes(roles?: any[]) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        getRouters().then((res) => {
          const sdata = JSON.parse(JSON.stringify(res.data));
          const rdata = JSON.parse(JSON.stringify(res.data));
          const defaultData = JSON.parse(JSON.stringify(res.data));
          const sidebarRoutes = filterAsyncRouter(sdata);
          const rewriteRoutes = filterAsyncRouter(rdata, false, true);
          const defaultRoutes: any = filterAsyncRouter(defaultData);
          const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
          // asyncRoutes.forEach((route:any) => { router.addRoute(route) })
          this.setRoutes(rewriteRoutes);
          this.setSidebarRouters(constantRoutes.concat(sidebarRoutes));
          this.setDefaultRoutes(sidebarRoutes);
          this.setTopbarRoutes(defaultRoutes);
          resolve(rewriteRoutes);
        });
      });
    }
  }
});
