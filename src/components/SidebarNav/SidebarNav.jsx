import { NavLink } from "react-router-dom";
import "./SidebarNav.css";

const SidebarNav = () => {
  return (
    <section className="sidebar">
      <div className="sidebar-content">
        <h4 className="brand">SalesTrail</h4>
        <NavLink to="/" className="nav-link" onClick={() => setCloseSideBar(false)}>
          Dashboard
        </NavLink>

        <NavLink to="/allLeads" className="nav-link" onClick={() => setCloseSideBar(false)}>
          Leads
        </NavLink>

        <NavLink to="/salesAgents" className="nav-link" onClick={() => setCloseSideBar(false)}>
          Sales Agents
        </NavLink>

        <NavLink to="/reports" className="nav-link" onClick={() => setCloseSideBar(false)}>
          Reports
        </NavLink>
        <NavLink to="/leadStatusView" className="nav-link" onClick={() => setCloseSideBar(false)}>
          Lead Status View
        </NavLink>

        <NavLink to="/salesAgentView" className="nav-link" onClick={() => setCloseSideBar(false)}>
          Sales Agent View
        </NavLink>
      </div>
    </section>
  );
};

export default SidebarNav;
