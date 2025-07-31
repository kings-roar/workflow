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
      const response = await fetch("http://localhost:9459/creds"); // replace with your server host
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

  const userData = [
    {
      dag_name: "Galen Slixby",
      schedule: "gslixby0@abc.net.au",
      source_type: "Editor",
      destination_type: "Enterprise",
      source_table_name: "Inactive",
      destination_table_name: "source table",
      createdAt: "22-july-2025 10:23:24",
      modifiedAt: "22-july-2025 10:23:24",
    }
  ];

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
