import React, { useState } from "react";
import Header from "../components/Header/Header";
import AddWorkflow from "../components/AddWorkflow/AddWorkflow";
import AutomationTable from "../components/AutomationTable/AutomationTable";
const AutomationWorkflow = () => {
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
      schedule_type: "test",
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
      schedule_type: "test",
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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",

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
      schedule_type: "test",
      createdAt: "22-july-2025 10:23:24",
      modifiedAt: "22-july-2025 10:23:24",
    },
    // more...
  ];
  return (
    <>
      <Header />
      <AddWorkflow showSideBar={showSideBar} handleClose={handleClose} handleToggle={handleOpen} />
      <AutomationTable data={userData} handleToggle={handleOpen} />
    </>
  );
};

export default AutomationWorkflow;
