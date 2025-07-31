import TopBar from "./components/TopBar/TopBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default Layout;
