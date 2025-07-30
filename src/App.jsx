import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AutomationWorkflow from "./pages/AutomationWorkflow";
import WorkflowDestination from "./pages/WorkflowDestination";
import Layout from "./Layout";
import CredsCreation from "./pages/CreadsCreation";
import ActivityDashboard from "./pages/ActivityDashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <ActivityDashboard />
            </Layout>
          }
        />
       
        <Route
          path="/creds"
          element={
            <Layout>
              <CredsCreation />
            </Layout>
          }
        />
        <Route
          path="/workflow"
          element={
            <Layout>
              <AutomationWorkflow />
            </Layout>
          }
        />
        <Route
          path="/source-destination"
          element={
            <Layout>
              <WorkflowDestination />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
