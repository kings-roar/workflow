import Sidebar from "./components/SideBar/SideBar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "80px", width: "100%" }}>{children}</div>
    </div>
  );
};

export default Layout;
