import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/store/auth/actions';

import PageLoader from '@/components/PageLoader';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function asyncLogout() {
    dispatch(logoutAction());
  }


  useEffect(() => {
    asyncLogout();
    navigate('/auth/login');
  }, []);

  return <PageLoader />;
};
export default Logout;
