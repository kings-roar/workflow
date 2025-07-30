import React, { useEffect, useState } from "react";
import AddDestination from "../components/AddDestination/AddDestination";
import SourceDestTable from "../components/AddDestination/SourceDestTable/SourceDestTable";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

const WorkflowDestination = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShowSideBar(false);
  };

  const handleOpen = () => {
    setShowSideBar(!showSideBar);
  };

  const fetchDestinations = async () => {
    try {
      const response = await fetch("http://localhost:9459/destinations"); // replace with your server host
      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }
      const data = await response.json();
      setDestinations(data); // assuming data is an array of destinations
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
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
      <AddDestination
        showSideBar={showSideBar}
        handleClose={handleClose}
        handleToggle={handleOpen}
      />
      {loading ? (
        <SkeletonLoader rows={5} showHeader={true} showActions={true} />
      ) : (
        <SourceDestTable data={destinations} handleToggle={handleOpen} />
      )}
    </>
  );
};

export default WorkflowDestination;
