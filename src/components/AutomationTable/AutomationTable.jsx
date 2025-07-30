import React from "react";
import styles from "./AutomationTable.module.scss";

const UserTable = ({ data, handleToggle, onSearch }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search user..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className={styles.addUserButton} onClick={handleToggle}>
          + Add Automation
        </button>
      </div>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Dag Name</th>
            <th>Schedule Cron</th>
            <th>Source Creds</th>
            <th>Destination Creds</th>
            <th>Source Table</th>
            <th>Schedule Type</th>
            <th>Created At</th>
            <th>Modified At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((w, idx) => (
            <tr key={idx}>
              <td>{w.dag_name}</td>
              <td>{w.schedule}</td>
              <td>
                <span className={`${styles.role} ${styles[w.role]}`}>{w.source_type}</span>
              </td>
              <td>{w.destination_type}</td>
              <td>
                <span className={`${styles.status} ${styles[w.status]}`}>
                  {w.source_table_name}
                </span>
              </td>
              <td>
                <span className={`${styles.status} ${styles[w.status]}`}>
                  {w.destination_table_name}
                </span>
              </td>
              <td>{w.createdAt}</td>
              <td>{w.modifiedAt}</td>
              <td className={styles.action}>
                <button title="View" className={styles.viewBtn}>
                  👁️
                </button>
                <button title="Delete" className={styles.deleteBtn}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
