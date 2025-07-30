import React, { useState } from "react";
import Header from "../components/Header/Header";
import AddDestination from "../components/AddDestination/AddDestination";
import SourceDestTable from "../components/AddDestination/SourceDestTable/SourceDestTable";

const WorkflowDestination = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleClose = () => {
    setShowSideBar(false);
  };

  const handleOpen = () => {
    setShowSideBar(!showSideBar);
  };

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
    },
    {
      dag_name: "Galen Slixby",
      schedule: "gslixby0@abc.net.au",
      source_type: "Editor",
      destination_type: "Enterprise",
      source_table_name: "Inactive",
      destination_table_name: "source table",
      createdAt: "22-july-2025 10:23:24",
      modifiedAt: "22-july-2025 10:23:24",
    },
    // more...
  ];

  return (
    <>
      <Header />
      <AddDestination
        showSideBar={showSideBar}
        handleClose={handleClose}
        handleToggle={handleOpen}
      />
      <SourceDestTable data={userData} handleToggle={handleOpen} />
    </>
  );
};

export default WorkflowDestination;
