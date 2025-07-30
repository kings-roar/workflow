import Sidebar from "./components/SideBar/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-52 p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
