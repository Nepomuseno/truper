import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default MainLayout;
