import { Outlet, useLocation } from 'react-router-dom';
import { Header, CreateStudy } from './Header';

export function Layout (){
    const location = useLocation();
    const onHome = location.pathname === "/";

    return (
        <div>
            <Header actions={onHome ? <CreateStudy /> : null} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}