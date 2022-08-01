import { isAuthenticatedAtom } from '@/store/modules/user';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function GuestGuard({ children }: any) {
  const [isAuthenticated] = useRecoilState(isAuthenticatedAtom);

  if (isAuthenticated) {
    return <Navigate to={'/home'} />;
  }

  return <>{children}</>;
}
