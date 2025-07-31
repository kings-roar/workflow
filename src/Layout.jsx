import TopBar from "./components/TopBar/TopBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="pt-16 p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
