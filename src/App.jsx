import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import Header from "./components/Header/Header";
import SalesContext from "./contexts/SalesContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function App() {
  const {
    leadData,
    leadLoading,
    leadError,
    closeSideBar,
    filteredData,
    setActiveStatus,activeStatus
  } = useContext(SalesContext);



  const statusCounts = leadData?.leads?.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>

        <section className="container my-3">
          <Header title="CRM Dashboard" />
          <div className="leadList">
            <h3>Leads</h3>
            {leadLoading && <p>Loading...</p>}
            {/* no. of leads */}
            <div className="row">
              {!leadLoading &&
                filteredData.length > 0 &&
                filteredData.map((lead, index) => (
                  <div
                    key={lead._id}
                    className="col-md-3 col-sm-4 col-6 border p-2"
                  >
                    {index + 1}. {lead.name}
                  </div>
                ))}
            </div>
            {!leadLoading || (leadError && <p>No Leads Found.</p>)}
          </div>
          {/* leads status */}
          <div className="leadStatus">
            <h3>Lead Status:</h3>

            {!leadLoading &&
              statusCounts &&
              Object.entries(statusCounts).map(([status, count], index) => (
                <p key={index} className="my-3">
                  - {status}: [{count}] Leads
                </p>
              ))}
          </div>

          {/* <div className="quick-filters">
            <h3>Quick Filters</h3>
            <div className="filterButtons">
              {statusFilters.map((item, index) => (
                <button key={index + 1}
                  className="btn btn-dark"
                  onClick={() => setActiveStatus(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div> */}

          <div className="quick-filters my-4">
  <h3>Quick Filters</h3>

  <ul className="nav nav-pills flex-wrap gap-2">
    <li className="nav-item">
      <button
        className={`nav-link ${activeStatus === "All" ? "active" : ""}`}
        onClick={() => setActiveStatus("All")}
      >
        All
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`nav-link ${activeStatus === "New" ? "active" : ""}`}
        onClick={() => setActiveStatus("New")}
      >
        New
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`nav-link ${activeStatus === "Contacted" ? "active" : ""}`}
        onClick={() => setActiveStatus("Contacted")}
      >
        Contacted
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`nav-link ${activeStatus === "Qualified" ? "active" : ""}`}
        onClick={() => setActiveStatus("Qualified")}
      >
        Qualified
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`nav-link ${activeStatus === "Proposal Sent" ? "active" : ""}`}
        onClick={() => setActiveStatus("Proposal Sent")}
      >
        Proposal Sent
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`nav-link ${activeStatus === "Closed" ? "active" : ""}`}
        onClick={() => setActiveStatus("Closed")}
      >
        Closed
      </button>
    </li>
  </ul>
</div>

          <div className="addLead">
            <Link className="btn btn-primary" to="/addLead">
              Add New Lead
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
