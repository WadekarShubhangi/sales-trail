import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";
import { useContext, useEffect } from "react";
import SalesContext from "../../contexts/SalesContext";
import { Link } from "react-router-dom";
const AllLeads = () => {
  const {
    agentsData,
    agentsLoading,
    leadLoading,
    leadError,
    closeSideBar,
    filteredData,
    setActiveStatus,
    setActiveAgent,
    sortByTime,
    setSortByTime,
    resetFilters,
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
          <Header title="Leads" />

          <section className="mb-3">
            <div className="row mb-3">
              <div className="col-md-6 col-sm-6 col-12 mb-2">
                <label>Filter by Status:</label> <br />
                <select
                  className="form-select w-100"
                  onChange={(e) => setActiveStatus(e.target.value)}
                >
                  <option className="bg-dark text-light" value="All">All</option>
                  <option className="bg-dark text-light" value="New">New</option>
                  <option className="bg-dark text-light" value="Contacted">Contacted</option>
                  <option className="bg-dark text-light" value="Qualified">Qualified</option>
                  <option className="bg-dark text-light" value="Proposal Sent">Proposal Sent</option>
                  <option className="bg-dark text-light" value="Closed">Closed</option>
                </select>
              </div>
              <div className="col-md-6 col-sm-6 col-12 mb-2">
                <label>Filter by Sales Agents:</label> <br />
                <select
                  className="form-select"
                  onChange={(e) => setActiveAgent(e.target.value)}
                >
                  <option className="bg-dark text-light" value="All">All</option>
                  {!agentsLoading &&
                    agentsData?.agents?.map((item) => (
                      <option className="bg-dark text-light" key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-6 col-sm-6 col-12 mb-2">
                <select
                  className="form-select"
                  onChange={(e) => setSortByTime(e.target.value)}
                >
                  <option className="bg-dark text-light" value="All">Sort by Time to Close</option>
                  <option className="bg-dark text-light" value="Low to High">Low-to-High (Time-to-Close)</option>
                  <option className="bg-dark text-light" value="High to Low">High-to-Low (Time-to-Close)</option>
                </select>
              </div>
              <div className="col-md-6 col-sm-6 col-12 mb-2">
                <Link to="/addLead" className="btn btn-primary w-100">
                  Add Lead
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-3">
            {leadLoading && <p>Loading...</p>}
            <ul className="list-group">
              {!leadLoading &&
                filteredData?.length > 0 &&
                filteredData?.map((lead, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                  >
                    <Link className="row text-decoration-none text-dark"  to={`/leadDetails/${lead._id}`}>
                      <div className="col-md-4 col-2">Lead {index + 1}</div>
                      <div className="col-md-4 col-4">{lead.status}</div>
                      <div className="col-md-4 col-6">{lead.name}</div>
                    </Link>
                  </li>
                ))}
            </ul>
            {!leadLoading || (leadError && <p>No Leads Found.</p>)}
          </section>
        </div>
      </main>
    </>
  );
};
export default AllLeads;