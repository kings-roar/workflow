import React, { useEffect, useState } from "react";
import AddWorkflow from "../components/AddWorkflow/AddWorkflow";
import AutomationTable from "../components/AutomationTable/AutomationTable";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

const AutomationWorkflow = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShowSideBar(false);
  };

  const handleOpen = () => {
    setShowSideBar(!showSideBar);
  };

  const fetchWorkflows = async () => {
    try {
      const response = await fetch("/autoflow/v1/dags"); // replace with your server host
      if (!response.ok) {
        throw new Error("Failed to fetch workflows");
      }
      const data = await response.json();
      setWorkflows(data); // assuming data is an array of workflows
    } catch (error) {
      console.error("Error fetching workflows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  // const userData = [
  //   {
  //     dag_name: "Galen Slixby",
  //     schedule: "gslixby0@abc.net.au",
  //     source_type: "Editor",
  //     destination_type: "Enterprise",
  //     source_table_name: "Inactive",
  //     destination_table_name: "source table",
  //     schedule_type: "test",
  //     createdAt: "22-july-2025 10:23:24",
  //     modifiedAt: "22-july-2025 10:23:24",
  //   }
  // ];

  return (
    <>
      {/* <Header /> */}
      <br />
      <AddWorkflow showSideBar={showSideBar} handleClose={handleClose} handleToggle={handleOpen} />
      {loading ? (
        <SkeletonLoader rows={5} showHeader={true} showActions={true} />
      ) : (
        <AutomationTable data={workflows} handleToggle={handleOpen} />
      )}
    </>
  );
};

export default AutomationWorkflow;
