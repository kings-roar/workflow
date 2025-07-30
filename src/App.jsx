import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import ActivityDashboard from "./pages/ActivityDashboard";
import AutomationWorkflow from "./pages/AutomationWorkflow";
import CredsCreation from "./pages/CreadsCreation";
import WorkflowDestination from "./pages/WorkflowDestination";

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
