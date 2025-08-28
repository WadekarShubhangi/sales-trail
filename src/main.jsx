import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
// import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SalesProvider } from "./contexts/SalesContext.jsx";
import AddLead from "./pages/AddLead/AddLead.jsx";
import EditLead from "./pages/EditLead/EditLead";
import AllLeads from "./pages/AllLeads/AllLeads.jsx";
import LeadDetails from "./pages/LeadDetails/LeadDetails.jsx";
import Sales from "./pages/Sales/Sales.jsx";
import Agents from "./pages/Agents/Agents.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/addLead", element: <AddLead /> },
  { path: "/allLeads", element: <AllLeads /> },
  { path: "/leadDetails/:leadId", element: <LeadDetails /> },
  { path: "/sales", element: <Sales /> },
  { path: "/agents", element: <Agents /> },
  { path: "/reports", element: <Reports /> },
  { path: "/leads/:id/edit", element: <EditLead />},
  { path: "/settings", element: <Settings /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SalesProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={1000} />
    </SalesProvider>
  </StrictMode>
);
