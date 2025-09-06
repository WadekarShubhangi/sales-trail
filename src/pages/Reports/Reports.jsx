import { useContext } from "react";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import SalesContext from "../../contexts/SalesContext";
import Header from "../../components/Header/Header";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import "./Reports.css";

const Reports = () => {
  const {
    closeSideBar,
    reportLastWeekData,
    reportPipelineData,
    reportAgentData,
    reportLastWeekLoading,
    reportPipelineLoading,
    reportAgentLoading,
  } = useContext(SalesContext);

  if (reportLastWeekLoading || reportPipelineLoading || reportAgentLoading) {
    return <p className="text-center mt-3">Loading reports...</p>;
  }

// Closed & pipeline
const closedLeads = reportLastWeekData?.leads?.length || 0;
const pipelineLeads = reportPipelineData?.leads?.length || 0;

// Closed by agent
const agentLeadsArray = reportAgentData || [];
const agentLabels = agentLeadsArray.map(item => item._id || "Unknown");
const agentCounts = agentLeadsArray.map(item => item.closedLeads || 0);

// Status distribution
const allLeads = [
  ...(reportLastWeekData?.leads || []),
  ...(reportPipelineData?.leads || [])
];
const statusCountsObj = {};
allLeads.forEach(lead => {
  const status = lead.status || "Unknown";
  statusCountsObj[status] = (statusCountsObj[status] || 0) + 1;
});
const statusLabels = Object.keys(statusCountsObj);
const statusCounts = Object.values(statusCountsObj);

  return (
    <main className="d-flex crm-dashboard">
      <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
        <SidebarNav />
      </aside>
      <div className="container my-3">
        <Header title="Reports" />

        <div className="my-2 border">
          <h5 className="my-3 text-center">Total Leads Closed & In Pipeline</h5>
          <div className="report-leads">
            <Doughnut
              data={{
                labels: ["Closed Leads", "In Pipeline"],
                datasets: [
                  {
                    label: "Leads",
                    data: [closedLeads, pipelineLeads],
                    backgroundColor: ["#36A2EB", "#FFCE56"],
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className="my-2 border">
          <h5 className="my-3 text-center">Leads Closed by Sales Agent</h5>
          <div className="report-leads">
            <Bar
              data={{
                labels: agentLabels,
                datasets: [
                  {
                    label: "Closed Leads",
                    data: agentCounts,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                    barThickness: 30,
                    maxBarThickness: 40,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: true, position: "top" } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1, precision: 0 } } },
              }}
            />
          </div>
        </div>

        <div className="my-2 border">
          <h5 className="my-3 text-center">Lead Status Distribution</h5>
          <div className="report-leads">
            <Doughnut
              data={{
                labels: statusLabels,
                datasets: [
                  {
                    label: "Lead Status",
                    data: statusCounts,
                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reports;
