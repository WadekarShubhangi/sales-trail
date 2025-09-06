import { useContext, useEffect } from "react";
import SalesContext from "../../contexts/SalesContext";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const LeadStatusView = () => {
  const {
    closeSideBar,
    leadLoading,
    leadError,
    filteredData,
    setActiveStatus,
    agentsData,
    agentsLoading,
    setSortByTime,
    setActiveAgent,
    resetFilters,
    setActivePriority,
    activePriority
  } = useContext(SalesContext);

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
          <Header title="Lead Status View" />
          <div className="row my-3">
            <div className="col-md-6 col-sm-6 col-12">
              <label className="fw-semibold mb-2">Filter by Status:</label>{" "}
              <br />
              <select
                className="form-select w-100"
                onChange={(e) => setActiveStatus(e.target.value)}
              >
                <option className="bg-dark text-light" value="All">
                  All
                </option>
                <option className="bg-dark text-light" value="New">
                  New
                </option>
                <option className="bg-dark text-light" value="Contacted">
                  Contacted
                </option>
                <option className="bg-dark text-light" value="Qualified">
                  Qualified
                </option>
                <option className="bg-dark text-light" value="Proposal Sent">
                  Proposal Sent
                </option>
                <option className="bg-dark text-light" value="Closed">
                  Closed
                </option>
              </select>
            </div>
            <div className="col-md-6 col-sm-6 col-12">
               <label className="fw-semibold mb-2">Filter by Priority:</label>{" "}
              <br />
              <select
                className="form-select w-100"
                onChange={(e) => setActivePriority(e.target.value)}
              >
                <option className="bg-dark text-light" value="All">
                  All
                </option>
                <option className="bg-dark text-light" value="High">
                  High
                </option>
                <option className="bg-dark text-light" value="Medium">
                  Medium
                </option>
                <option className="bg-dark text-light" value="Low">
                  Low
                </option>
              </select>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-6 col-sm-6 col-12">
              <label className="fw-semibold mb-2">
                Filter by Sales Agents:
              </label>{" "}
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
            <div className="col-md-6 col-sm-6 col-12">
              <label className="fw-semibold mb-2">Sort by Time to Close:</label>{" "}
              <br />
              <select
                className="form-select"
                onChange={(e) => setSortByTime(e.target.value)}
              >
                <option className="bg-dark text-light" value="All">
                  Sort by Time to Close
                </option>
                <option className="bg-dark text-light" value="Low to High">
                  Low-to-High (Time-to-Close)
                </option>
                <option className="bg-dark text-light" value="High to Low">
                  High-to-Low (Time-to-Close)
                </option>
              </select>
            </div>
          </div>
          {leadLoading && <p>Loading...</p>}
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
              
                <div className="col-sm-3 col-4 fw-semibold">Lead Name</div>
                <div className="col-sm-3 col-4 fw-semibold">Lead Agent</div>
                <div className="col-sm-3 col-2 fw-semibold">Time to close</div>
                  <div className="col-sm-3 col-2 fw-semibold">Lead Status</div>
              </div>
            </li>
            {!leadLoading &&
              filteredData.length > 0 &&
              filteredData.map((lead, index) => (
                <li key={lead._id} className="list-group-item">
                  <div className="row">
                    <div className="col-sm-3 col-4">{index + 1}. {lead.name}</div>
                    <div className="col-sm-3 col-4">{lead.salesAgent.name}</div>
                    <div className="col-sm-3 col-2">{lead.timeToClose}</div>
                     <div className="col-sm-3 col-2">{lead.status}</div>
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

export default LeadStatusView;
