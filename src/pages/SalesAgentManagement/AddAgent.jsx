import { useContext } from "react";
import SalesContext from "../../contexts/SalesContext";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const AddAgent = () => {
  const { closeSideBar, agentHandleChange, agentHandleSubmit, agentFormData } = useContext(SalesContext);
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Add New Agent" />

          <form
            onSubmit={agentHandleSubmit}
            className="agent-form"
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={agentFormData.name}
                onChange={agentHandleChange}
                required
                 className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={agentFormData.email}
                onChange={agentHandleChange}
                required
                className="form-control"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Agent
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
export default AddAgent;
