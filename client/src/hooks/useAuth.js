import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus, logOut, selectIsAuthenticated } from './authSlice';

const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const login = (isAuthenticated) => {
    dispatch(setLoginStatus(isAuthenticated));
  };

  const logout = () => {
    dispatch(logOut());
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;