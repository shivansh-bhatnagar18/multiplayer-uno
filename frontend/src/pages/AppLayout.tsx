import { Outlet } from 'react-router-dom';

function AppLayout() {
    return (
        <div>
            <Outlet />
            {/* todo: Add a footer component */}
        </div>
    );
}

export default AppLayout;
