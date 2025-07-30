import React from "react";
import styles from "./SourceDestTable.module.scss";

const SourceDestTable = ({ data, handleToggle, onSearch }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search source/destination..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className={styles.addUserButton} onClick={handleToggle}>
          + Add Source/Destionation
        </button>
      </div>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Cred Name</th>
            <th>Cred Type</th>
            <th>Cred Purpose </th>
            <th>Api Url</th>
            <th>Api Username</th>
            <th>Api api_password</th>
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

export default SourceDestTable;
