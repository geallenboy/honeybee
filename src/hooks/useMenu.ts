import { useLocation } from 'react-router';

import { menuType } from '@/api/public';

const getOpenKeys = (data: menuType[]): string[] => {
  const oks: string[] = [];
  for (const key of data) {
    oks.push(key.id);
  }
  return oks;
};

const useMenu = (menuList: any): [menuType[], string[], string[]] => {
  const location = useLocation();
  const openKeys: string[] = getOpenKeys(menuList);
  const selectedKeys: string[] = [location.pathname];
  return [menuList, openKeys, selectedKeys];
};

export default useMenu;
