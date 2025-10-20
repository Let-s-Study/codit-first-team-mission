import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import './Header.module.scss';

export function Layout() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <div>
      <Header actions={onHome ? <CreateStudyBtn /> : null} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}