import { Suspense } from 'react';
import NavigationHeader from './Navigation';
import { Outlet } from 'react-router-dom';
import { useNavigationTitle } from '../context/NavigationContext';

const Layout = () => {
  const { navigationTitle } = useNavigationTitle() as {
    navigationTitle: string;
  };

  return (
    <>
      <NavigationHeader title={navigationTitle} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
