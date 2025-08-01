import React, { useEffect, useState } from "react";
import AddCreds from "../components/AddCreds/AddCreds";
import CredsTable from "../components/AddCreds/CredsTable/CredsTable";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

const CredsCreation = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [creds, setCreds] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShowSideBar(false);
  };

  const handleOpen = () => {
    setShowSideBar(!showSideBar);
  };

  const fetchCreds = async () => {
    try {
      const response = await fetch("/autoflow/v1/api-creds"); // replace with your server host
      if (!response.ok) {
        throw new Error("Failed to fetch creds");
      }
      const data = await response.json();
      setCreds(data); // assuming data is an array of creds
    } catch (error) {
      console.error("Error fetching creds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreds();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <br />
      <AddCreds showSideBar={showSideBar} handleClose={handleClose} handleToggle={handleOpen} />
      {loading ? (
        <SkeletonLoader rows={5} showHeader={true} showActions={true} />
      ) : (
        <CredsTable data={creds} handleToggle={handleOpen} />
      )}
    </>
  );
};

export default CredsCreation;
