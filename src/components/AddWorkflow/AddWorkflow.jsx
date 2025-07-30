import React from "react";
import styles from "./AddWorkflow.module.scss";
import CustomForm from "../CustomForm/CustomForm";
import { AddAutomationWorkflow } from "../../utils/constants/globalConstant";

const AddWorkflow = ({ showSideBar, handleClose, handleToggle }) => {
  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    // Handle form submission logic
  };

  const handleFormCancel = () => {
    console.log("Form Cancelled");
    handleToggle();
  };

  return (
    <>
      {showSideBar && (
        <div onClick={handleClose} className={`${styles.menuMobSidebarBoxOverlay}`}></div>
      )}
      <div className={`${styles.menuMobSidebarBox} ${showSideBar ? styles["active"] : ""}`}>
        <div className={`${styles.hamburgerMenuBtn} ${styles.closeBtn}`} onClick={handleToggle}>
          <span className={`${styles.l1}`}></span>
          <span className={`${styles.l2}`}></span>
          <span className={`${styles.l3}`}></span>
        </div>
        <div className={`${styles.sideBarBodyBox}`}>
          <div className={`${styles.addUserFormWrap}`}>
            <h3 className={`${styles.sidebarTitle}`}>Add New Workflow</h3>
            <div className={`${styles.formWrap}`}>
              <CustomForm
                config={AddAutomationWorkflow}
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

export default AddWorkflow;
