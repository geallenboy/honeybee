import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';
import ManagerLayout from '@/layout';

export const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense
      fallback={
        <div className="loading_div">
          <Spin size={'large'} />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const Redirect = Loadable(lazy(() => import('@/views/redirect/index')));
const Login = Loadable(lazy(() => import('@/views/auth/login')));
const Register = Loadable(lazy(() => import('@/views/auth/register')));
const Page404 = Loadable(lazy(() => import('@/views/result/page404')));
const Page403 = Loadable(lazy(() => import('@/views/result/page403')));
const Index = Loadable(lazy(() => import('@/views/index')));
const Profile = Loadable(lazy(() => import('@/views/system/user/profile/index')));

// 公共路由
export const constantRoutes: any[] = [
  {
    path: '/redirect',
    element: <ManagerLayout />,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        element: <Redirect />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    hidden: true
  },
  {
    path: '/register',
    element: <Register />,
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    element: <Page404 />,
    hidden: true
  },
  {
    path: '/401',
    element: <Page403 />,
    hidden: true
  },
  {
    path: '',
    element: <ManagerLayout />,
    redirect: '/index',
    children: [
      {
        path: '/index',
        element: <Index />,
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    element: <ManagerLayout />,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        element: <Profile />,
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes: any[] = [
  {
    path: '/system/user-auth',
    element: <ManagerLayout />,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        element: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    element: <ManagerLayout />,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        element: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    element: <ManagerLayout />,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        element: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    element: <ManagerLayout />,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index',
        element: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    element: <ManagerLayout />,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        element: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
];
export default function RouterView() {
  return useRoutes(constantRoutes as any);
}
