import { useContext, useState } from "react";
import SalesContext from "../../contexts/SalesContext";

import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const SalesAgent = () => {
  const {
    leadHandleChange,
    leadHandleSubmit,
    agentsData,
    leadFormData,
    closeSideBar,
  } = useContext(SalesContext);
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Agents" />
         
        </div>
      </main>
    </>
  );
};
export default SalesAgent;
