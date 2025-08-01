import React, { useEffect, useState } from "react";
import AddCreds from "../components/AddCreds/AddCreds";
import CredsTable from "../components/AddCreds/CredsTable/CredsTable";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

const CredsCreation = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [creds, setCreds] = useState([]);
  const [filteredCreds, setFilteredCreds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => {
    setShowSideBar(false);
  };

  const handleOpen = () => {
    setShowSideBar(!showSideBar);
  };

  const fetchCreds = async () => {
    try {
      const response = await fetch("/autoflow/v1/api-creds");
      if (!response.ok) {
        throw new Error("Failed to fetch creds");
      }
      const data = await response.json();
      setCreds(data);
      setFilteredCreds(data);
    } catch (error) {
      console.error("Error fetching creds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreds();
  }, []);

  useEffect(() => {
    const filtered = creds.filter((item) =>
      item.cred_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCreds(filtered);
  }, [searchTerm, creds]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <br />
      <AddCreds
        showSideBar={showSideBar}
        handleClose={handleClose}
        handleToggle={handleOpen}
        onCredCreated={fetchCreds}
      />
      {loading ? (
        <SkeletonLoader rows={5} showHeader={true} showActions={true} />
      ) : (
        <CredsTable
          data={filteredCreds}
          handleToggle={handleOpen}
          onSearch={handleSearch}
        />
      )}
        <br />
    </>
  );
};

export default CredsCreation;
