import React, { useState } from "react";
import styles from "./AddCreds.module.scss";
import CustomForm from "../CustomForm/CustomForm";
import { credsFormConfig } from "../../utils/constants/globalConstant";
import { createCreds } from "../../services/services";

const AddCreds = ({ showSideBar, handleClose, handleToggle }) => {
  const [formKey, setFormKey] = useState(Date.now());

  const handleFormSubmit = async (data) => {
    console.log("Form Submitted", data);
    try {
      const response = await createCreds(data);
      if (response?.success) {
        console.log("Creds created successfully!");
        setFormKey(Date.now());
      } else {
        console.error("API call did not return success.");
      }
    } catch (error) {
      console.error("Error sending creds:", error);
    }
  };

  const handleFormCancel = () => {
    console.log("Form Cancelled");
    handleToggle();
  };

  return (
    <>
      {showSideBar && <div onClick={handleClose} className={styles.menuMobSidebarBoxOverlay}></div>}
      <div className={`${styles.menuMobSidebarBox} ${showSideBar ? styles.active : ""}`}>
        <div className={`${styles.hamburgerMenuBtn} ${styles.closeBtn}`} onClick={handleToggle}>
          <span className={styles.l1}></span>
          <span className={styles.l2}></span>
          <span className={styles.l3}></span>
        </div>
        <div className={styles.sideBarBodyBox}>
          <div className={styles.addUserFormWrap}>
            <h3 className={styles.sidebarTitle}>Add New Creds</h3>
            <div className={styles.formWrap}>
              <CustomForm
                key={formKey} // forces re-render on success
                config={credsFormConfig}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCreds;
