import { NavLink } from "react-router-dom";
import { FaProjectDiagram, FaMapMarkedAlt } from "react-icons/fa";

import styles from "./Sidebar.module.scss";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
         <NavLink to="/dashboard" className={styles.link} activeClassName={styles.active}>
        <MdDashboard /> <span>Dashboard</span>
      </NavLink>
      <NavLink to="/creds" className={styles.link} activeClassName={styles.active}>
        <FaMapMarkedAlt /> <span>Creds</span>
      </NavLink>
      <NavLink to="/source-destination" className={styles.link} activeClassName={styles.active}>
        <FaMapMarkedAlt /> <span>Destination</span>
      </NavLink>
      <NavLink to="/workflow" className={styles.link} activeClassName={styles.active}>
        <FaProjectDiagram /> <span>Workflow</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
