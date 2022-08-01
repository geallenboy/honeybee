import { defineModel } from 'foca';
import Cookies from 'js-cookie';

interface appProps {
  sidebar: {
    opened: boolean;
    withoutAnimation?: boolean;
    hide: boolean;
  };
  device: string;
  size: string;
}

const initialState: appProps = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? false : true,
    withoutAnimation: false,
    hide: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'default'
};

export const appModel = defineModel('app', {
  initialState,
  actions: {
    toggleSideBar(state, withoutAnimation?: boolean) {
      if (!state.sidebar.hide) {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = withoutAnimation;
        if (state.sidebar.opened) {
          Cookies.set('sidebarStatus', '1');
        } else {
          Cookies.set('sidebarStatus', '0');
        }
      }
    },
    closeSideBar(state, withoutAnimation: any) {
      Cookies.set('sidebarStatus', '0');
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(state, device: string) {
      state.device = device;
    },
    setSize(state, size: string) {
      state.size = size;
      Cookies.set('size', size);
    },
    toggleSideBarHide(state, status: boolean) {
      state.sidebar.hide = status;
    }
  }
});
