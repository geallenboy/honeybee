import { userAtom } from '@/store/modules/user';
import { useRecoilState } from 'recoil';
const useAuth = () => {
  const [user] = useRecoilState(userAtom);
  return user;
};

export default useAuth;
