import { useContext, useState } from "react";
import SalesContext from "../../contexts/SalesContext";

import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const SalesAgent = () => {
  const {
  agentsData,
  agentsLoading,
  agentsError,
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
         

         <section className="mb-3">
            {agentsLoading && <p>Loading...</p>}
            <ul className="list-group">
              {!agentsLoading &&
                agentsData?.length > 0 &&
                agentsData?.map((agent, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row text-decoration-none text-dark">
                      <div className="col-md-4 col-2">{agent.name}</div>
                      <div className="col-md-4 col-2">{agent.email}</div>

                    </div>
                  </li>
                ))}
            </ul>
            {!agentsLoading || (agentsError && <p>No Agents Found.</p>)}
          </section>
        </div>
      </main>
    </>
  );
};
export default SalesAgent;
