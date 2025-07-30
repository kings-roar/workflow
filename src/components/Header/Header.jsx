import React, { useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <header className={`${styles.headerSec}`}>
        <div className={`lmsContainer`}>
          <div className={`${styles.asideWrap}`}>
            <div className={`${styles.lhsWrap}`}>
              {/* <button
                className={`${styles.hamburgerMenuBtn}`}
                onClick={() => setShowSideBar(!showSideBar)}
              >
                <span className={`${styles.l1}`}></span>
                <span className={`${styles.l2}`}></span>
                <span className={`${styles.l3}`}></span>
              </button> */}
            </div>
            {/* <div className={`${styles.rhsWrap}`}>
              <button type="button" className={`commanBtn`}>
                Admin
              </button>
            </div> */}
          </div>
        </div>
      </header>

      {showSideBar && (
        <div
          onClick={() => setShowSideBar(false)}
          className={`${styles.menuMobSidebarBoxOverlay}`}
        ></div>
      )}
      <div className={`${styles.menuMobSidebarBox} ${showSideBar ? styles["active"] : ""}`}>
        <div
          className={`${styles.hamburgerMenuBtn} ${styles.closeBtn}`}
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <span className={`${styles.l1}`}></span>
          <span className={`${styles.l2}`}></span>
          <span className={`${styles.l3}`}></span>
        </div>
        <div className={`${styles.sideBarBodyBox}`}>
          <div className={`${styles.addUserFormWrap}`}>
            <h3 className={`${styles.sidebarTitle}`}>About</h3>
            <div className={`${styles.formWrap}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit obcaecati sequi
              laudantium molestias magni, tempore et minus ut hic cumque facilis blanditiis dolorem
              nemo sint neque praesentium impedit assumenda corporis velit quas! Accusantium quia
              amet illum perferendis rem, accusamus atque molestias voluptate harum, nulla et nihil
              eum voluptatum ut iste.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
