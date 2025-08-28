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
          {/* <NavLink to="/sales" className="nav-link">
            Sales
          </NavLink> */}
          <NavLink to="/salesAgents" className="nav-link">
            Sales Agents
          </NavLink>
           <NavLink to="/agents" className="nav-link">
            Agents
          </NavLink>
          <NavLink to="/reports" className="nav-link">
            Reports
          </NavLink>
          <NavLink to="/settings" className="nav-link">
            Settings
          </NavLink>
        </div>
    </section>
 
  );
};

export default SidebarNav;
