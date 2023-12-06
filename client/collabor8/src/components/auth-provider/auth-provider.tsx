import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchUserDetails } from '@/redux-store/slices/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '../ui/loader/loader';
import './auth-provider.css';

type AuthProviderProps = {
  children: React.ReactNode;
};

const allowedPaths = ['/', '/login', '/register'];

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogged } = useSelector((state) => state.userState);
  const isAllowed = isLogged || allowedPaths.includes(pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails())
      .then((res) => {
        if (res.payload && res.payload._id) return;
        if (!isAllowed) {
          router.push('/login');
        }
      })
      .catch((err) => console.log('Error while fetching user details', err));
  }, [dispatch, isAllowed, router]);

  return isAllowed ? (
    <>{children}</>
  ) : (
    <div className="auth-provider">{<Loader />}</div>
  );
}

export default AuthProvider;
