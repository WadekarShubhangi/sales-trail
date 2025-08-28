import { useContext } from "react";
import SalesContext from "../../contexts/SalesContext";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const AddLead = () => {
  const {
    closeSideBar,
  } = useContext(SalesContext);
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Add New Agent" />
        
        </div>
      </main>
    </>
  );
};
export default AddLead;
