import defaultSettings from '@/settings';
import { useDynamicTitle } from '@/utils/dynamicTitle';

import { defineModel } from 'foca';
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } =
  defaultSettings;

let setVal: any =
  localStorage.getItem('layout-setting') === null ? '{}' : localStorage.getItem('layout-setting');

const storageSetting = JSON.parse(setVal);

interface settingsProps {
  title: string;
  theme: string;
  sideTheme: any;
  showSettings: boolean;
  topNav: any;
  tagsView: any;
  fixedHeader: any;
  sidebarLogo: any;
  dynamicTitle: any;
}
const initialState: settingsProps = {
  title: '',
  theme: storageSetting.theme || '#409EFF',
  sideTheme: storageSetting.sideTheme || sideTheme,
  showSettings: showSettings,
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  dynamicTitle:
    storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
};

export const settingsModel = defineModel('settings', {
  initialState,
  actions: {
    // 修改布局设置
    changeSetting(state, data: any) {
      const { key, value } = data;
      if (state.hasOwnProperty(key)) {
        (state as any)[key] = value;
      }
    },
    // 设置网页标题
    setTitle(state, title: string) {
      state.title = title;
      useDynamicTitle();
    }
  }
});
