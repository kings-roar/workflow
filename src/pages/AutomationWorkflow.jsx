import React, { useEffect, useState } from "react";
import AddWorkflow from "../components/AddWorkflow/AddWorkflow";
import AutomationTable from "../components/AutomationTable/AutomationTable";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

const AutomationWorkflow = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => {
    setShowSideBar(false);
  };

  const handleOpen = () => {
    setShowSideBar(!showSideBar);
  };

  const fetchWorkflows = async () => {
    try {
      const response = await fetch("/autoflow/v1/dags");
      if (!response.ok) {
        throw new Error("Failed to fetch workflows");
      }
      const data = await response.json();
      setWorkflows(data);
    } catch (error) {
      console.error("Error fetching workflows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  // Filter workflows based on dag_name
  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.dag_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <br />
      <AddWorkflow
        showSideBar={showSideBar}
        handleClose={handleClose}
        handleToggle={handleOpen}
        onCredCreated={fetchWorkflows}
      />
      {loading ? (
        <SkeletonLoader rows={5} showHeader={true} showActions={true} />
      ) : (
        <AutomationTable
          data={filteredWorkflows}
          handleToggle={handleOpen}
          onSearch={setSearchQuery}
        />
      )}
         <br />
    </>
  );
};

export default AutomationWorkflow;
