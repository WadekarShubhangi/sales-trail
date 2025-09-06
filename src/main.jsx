import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
// import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SalesProvider } from "./contexts/SalesContext.jsx";
import AddLead from "./pages/LeadsManagement/AddLead.jsx";
import AllLeads from "./pages/LeadsManagement/AllLeads.jsx";
import LeadDetails from "./pages/LeadDetails/LeadDetails.jsx";
import SalesAgents from "./pages/SalesAgentManagement/SalesAgents.jsx";
import AddAgent from "./pages/SalesAgentManagement/AddAgent.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import LeadStatusView from "./pages/LeadStatusView/LeadStatusView.jsx";
import SalesAgentView from "./pages/SalesAgentView/SalesAgentView.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/addLead", element: <AddLead /> },
  { path: "/leads/:leadId/edit", element: <AddLead /> },
  { path: "/allLeads", element: <AllLeads /> },
  { path: "/leadDetails/:leadId", element: <LeadDetails /> },
  { path: "/salesAgents", element: <SalesAgents /> },
  { path: "/addAgent", element: <AddAgent /> },
  { path: "/reports", element: <Reports /> },
  { path: "/leadStatusView", element: <LeadStatusView /> },
  { path: "/salesAgentView", element: <SalesAgentView /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SalesProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={500} />
    </SalesProvider>
  </StrictMode>
);
