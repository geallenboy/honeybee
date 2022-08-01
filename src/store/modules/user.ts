import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { defineModel } from 'foca';
import defAva from '@/assets/images/profile.jpg';

interface userProps {
  token: string | undefined;
  name: string;
  avatar: string;
  roles: any[];
  permissions: any[];
}
const initialState: userProps = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  permissions: []
};
export const userModel = defineModel('user', {
  initialState,
  effects: {
    getLogin(userInfo: any) {
      console.log(userInfo, 8899);
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;

      return new Promise((resolve: any, reject: any) => {
        login(username, password, code, uuid)
          .then((res: any) => {
            setToken(res.token);
            console.log(res.token, 55566);
            // this.setState({token:res.token})
            this.state.token = res.token;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res: any) => {
            const user = res.user;
            const avatar =
              user.avatar == '' || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar;

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组

              this.setState({
                permissions: res.permissions,
                roles: res.roles
              });
            } else {
              this.setState({ roles: ['ROLE_DEFAULT'] });
            }
            this.setState({
              name: user.userName,
              avatar: avatar
            });

            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async logOut() {
      return new Promise((resolve: any, reject: any) => {
        logout()
          .then(() => {
            this.setState({
              roles: [],
              permissions: []
            });

            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
});
