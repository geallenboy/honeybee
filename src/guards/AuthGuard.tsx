import { Navigate, useLocation } from 'react-router-dom';
import { isRelogin } from '@/utils/request';

import defAva from '@/assets/images/profile.jpg';
import { useRecoilState } from 'recoil';
import { getToken } from '@/utils/auth';
import {
  addRoutesAtom,
  defaultRoutesAtom,
  routesAtom,
  sidebarRoutersAtom,
  topbarRoutersAtom
} from '@/store/modules/permission';
import { getInfo } from '@/api/login';
import { nameAtom, avatarAtom, rolesAtom, permissionsAtom } from '@/store/modules/user';
import { getRouters } from '@/api/menu';
import { filterAsyncRouter } from '@/utils/permission';
import { constantRoutes } from '@/router';

export default function AuthGuard({ children }: any) {
  const [addRoutesState] = useRecoilState(addRoutesAtom);
  const [, setNameState] = useRecoilState(nameAtom);
  const [, setAvatarState] = useRecoilState(avatarAtom);
  const [, setRolesState] = useRecoilState(rolesAtom);
  const [, setPermissionsState] = useRecoilState(permissionsAtom);
  const [, setRoutesAtomState] = useRecoilState(routesAtom);
  const [, setAddRoutesAtomState] = useRecoilState(addRoutesAtom);
  const [, setDefaultRoutesAtomState] = useRecoilState(defaultRoutesAtom);
  const [, setTopbarRoutersAtomState] = useRecoilState(topbarRoutersAtom);
  const [, setSidebarRoutersAtomState] = useRecoilState(sidebarRoutersAtom);

  const localtion = useLocation();

  const whiteList = ['/login', '/auth-redirect', '/bind', '/register'];

  if (getToken()) {
    if (localtion.pathname === 'login') {
      <Navigate to={'/'} />;
    } else {
      if (addRoutesState.length === 0) {
        isRelogin.show = true;
        // 判断当前用户是否已拉取完user_info信息
        getInfo().then((res: any) => {
          isRelogin.show = false;
          const user = res.user;
          const avatar =
            user.avatar == '' || user.avatar == null
              ? defAva
              : import.meta.env.VITE_APP_BASE_API + user.avatar;

          if (res.roles && res.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            setRolesState(res.roles);
            setPermissionsState(res.permissions);
          } else {
            setRolesState(['ROLE_DEFAULT']);
          }
          setNameState(user.userName);
          setAvatarState(avatar);
          getRouters().then((res2: any) => {
            const sdata = JSON.parse(JSON.stringify(res2.data));
            const rdata = JSON.parse(JSON.stringify(res2.data));
            const defaultData = JSON.parse(JSON.stringify(res2.data));

            const sidebarRoutes = filterAsyncRouter(sdata);
            const rewriteRoutes = filterAsyncRouter(rdata, false, true);
            const defaultRoutes: any = filterAsyncRouter(defaultData);
            // const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            // asyncRoutes.forEach(route => { router.addRoute(route) })
            setRoutesAtomState(rewriteRoutes);
            setAddRoutesAtomState(rewriteRoutes);
            setSidebarRoutersAtomState(constantRoutes.concat(sidebarRoutes));
            setDefaultRoutesAtomState(sidebarRoutes);
            setTopbarRoutersAtomState(defaultRoutes);
          });
        });
      }
    }
  } else {
    if (whiteList.indexOf(localtion.pathname) !== -1) {
      // 在免登录白名单，直接进入
      return <Navigate to={localtion.pathname} />;
    } else {
      return <Navigate to={'/login'} />;
    }
  }

  return <>{children}</>;
}
