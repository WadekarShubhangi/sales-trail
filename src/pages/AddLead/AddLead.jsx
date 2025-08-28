import { useContext, useState } from "react";
import SalesContext from "../../contexts/SalesContext";

import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";

const AddLead = () => {
  const {
    leadHandleChange,
    leadHandleSubmit,
    agentsData,
    leadFormData,
    closeSideBar,
  } = useContext(SalesContext);
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Add New Lead" />
          <form onSubmit={leadHandleSubmit} className="lead-form">
            <div className="mb-3">
              <label className="form-label fw-semibold">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter lead name"
                className="form-control"
                required
                value={leadFormData.name}
                onChange={leadHandleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Lead Source</label>
              <select
                name="source"
                className="form-select"
                required
                value={leadFormData.source}
                onChange={leadHandleChange}
              >
                <option value="">Select Source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Assigned Sales Agent
              </label>
              <select
                name="salesAgent"
                className="form-select"
                required
                value={leadFormData.salesAgent}
                onChange={leadHandleChange}
              >
                <option value="">Select Agent</option>
                {agentsData &&
                  agentsData?.agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Lead Status</label>
              <select
                name="status"
                className="form-select"
                required
                value={leadFormData.status}
                onChange={leadHandleChange}
              >
                <option value="">Select Status</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Proposal Sent</option>
                <option>Closed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="High Value, Urgent, Converted, Follow-up, etc."
                className="form-control"
                value={leadFormData.tags}
                onChange={leadHandleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Time to Close (days)
              </label>
              <input
                type="number"
                className="form-control"
                name="timeToClose"
                min="1"
                required
                value={leadFormData.timeToClose}
                onChange={leadHandleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Priority</label>
              <select
                name="priority"
                className="form-select"
                required
                value={leadFormData.priority}
                onChange={leadHandleChange}
              >
                <option value="">Select Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Lead
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
export default AddLead;
