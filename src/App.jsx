import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ActivityDashboard from "./pages/ActivityDashboard";
import Alerts from "./pages/Alerts";
import AutomationWorkflow from "./pages/AutomationWorkflow";
import CredsCreation from "./pages/CreadsCreation";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <ActivityDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/creds"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <CredsCreation />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/workflow"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AutomationWorkflow />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Layout>
                <Alerts />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/source-destination"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <WorkflowDestination />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
