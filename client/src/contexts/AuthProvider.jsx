import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../store/slices/authSlice';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const isGuest = decodedToken.guest || true;
          dispatch(setLoginStatus(!isGuest));
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        Cookies.remove('token');
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;