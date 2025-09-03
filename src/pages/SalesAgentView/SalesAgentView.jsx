import { useContext, useEffect } from "react";
import SalesContext from "../../contexts/SalesContext";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const SalesAgentView = () => {
  const { closeSideBar, resetFilters, agentsData,agentsLoading, leadLoading, leadError, filteredData } = useContext(SalesContext);
  useEffect(() => {
    resetFilters();
  }, [resetFilters]);
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Sales Agent View" />

          <div className="my-3">
            <label className="fw-semibold my-2">Filter by Sales Agents:</label>{" "}
            <br />
            <select
              className="form-select"
              onChange={(e) => setActiveAgent(e.target.value)}
            >
              <option className="bg-dark text-light" value="All">
                All
              </option>
              {!agentsLoading &&
                agentsData?.agents?.map((item) => (
                  <option
                    className="bg-dark text-light"
                    key={item._id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {leadLoading && <p>Loading...</p>}

          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-4 col-2 fw-semibold">Lead No.</div>
                <div className="col-sm-4 col-5 fw-semibold">Lead Name</div>
                <div className="col-sm-4 col-5 fw-semibold">Lead Status</div>
              </div>
            </li>
            {!leadLoading &&
              filteredData.length > 0 &&
              filteredData.map((lead, index) => (
                <li key={lead._id} className="list-group-item">
                  <div className="row">
                    <div className="col-sm-4 col-2">Lead {index + 1}</div>
                    <div className="col-sm-4 col-5">{lead.name}</div>
                    <div className="col-sm-4 col-5">{lead.status}</div>
                  </div>
                </li>
              ))}
          </ul>
          {!leadLoading && leadError && <p>No Leads Found.</p>}
        </div>
      </main>
    </>
  );
};

export default SalesAgentView;
