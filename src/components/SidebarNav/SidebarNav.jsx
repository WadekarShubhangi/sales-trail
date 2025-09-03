import { NavLink } from "react-router-dom";
import "./SidebarNav.css";

const SidebarNav = () => {
  return (
    <section className="sidebar">
      <div className="sidebar-content">
        <h4 className="brand">SalesTrail</h4>
        <NavLink to="/" className="nav-link">
          Dashboard
        </NavLink>

        <NavLink to="/allLeads" className="nav-link">
          Leads
        </NavLink>

        <NavLink to="/salesAgents" className="nav-link">
          Sales Agents
        </NavLink>

        <NavLink to="/reports" className="nav-link">
          Reports
        </NavLink>
        <NavLink to="/leadStatusView" className="nav-link">
          Lead Status View
        </NavLink>

        <NavLink to="/salesAgentView" className="nav-link">
          Sales Agent View
        </NavLink>
      </div>
    </section>
  );
};

export default SidebarNav;
