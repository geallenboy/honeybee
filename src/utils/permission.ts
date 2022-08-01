import auth from '@/plugins/auth';

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermi(value: string | any[]): boolean {
  if (value && value instanceof Array && value.length > 0) {
    const permissions: any = [];
    const permissionDatas = value;
    const all_permission = '*:*:*';

    const hasPermission = permissions.some((permission: string) => {
      return all_permission === permission || permissionDatas.includes(permission);
    });

    if (!hasPermission) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`);
    return false;
  }
}
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.tsx');

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value: string | any[]) {
  if (value && value instanceof Array && value.length > 0) {
    const roles: any = [];
    const permissionRoles = value;
    const super_admin = 'admin';

    const hasRole = roles.some((role: string) => {
      return super_admin === role || permissionRoles.includes(role);
    });

    if (!hasRole) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`);
    return false;
  }
}
// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRouter(asyncRouterMap: any[], lastRouter = false, type = false) {
  return asyncRouterMap.filter((route: any) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      route.component = loadView(route.component);
      // // Layout ParentView 组件特殊处理
      // if (route.component === 'Layout') {
      //   route.component = Layout
      // } else if (route.component === 'ParentView') {
      //   route.component = ParentView
      // } else if (route.component === 'InnerLink') {
      //   route.component = InnerLink
      // } else {
      //   route.component = loadView(route.component)
      // }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route['children'];
      delete route['redirect'];
    }
    return true;
  });
}

export const loadView = (view: string) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};

export function filterChildren(childrenMap: any[], lastRouter?: any) {
  var children: any[] = [];
  childrenMap.forEach((el: { children: any[]; component: string; path: string }, index: any) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c: any) => {
          c.path = el.path + '/' + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: any[]) {
  const res: any[] = [];
  routes.forEach((route: { permissions: any[]; roles: any[] }) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route);
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route);
      }
    }
  });
  return res;
}
