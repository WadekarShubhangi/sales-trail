import { useContext } from "react";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import SalesContext from "../../contexts/SalesContext";
import Header from "../../components/Header/Header";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import "./Reports.css";
const Reports = () => {
  const { closeSideBar, leadData } = useContext(SalesContext);

  // count closed aur pipeline leads
  const closedLeads = leadData?.leads?.filter(
    (lead) => lead.status === "Closed"
  ).length;
  const pipelinedLeads = leadData?.leads?.filter(
    (lead) => lead.status !== "Closed"
  ).length;

  // leads closed by Sales Agents
  const closedByAgent = {};
  leadData?.leads?.forEach((lead) => {
    if (lead.status === "Closed") {
      const agentName = lead.salesAgent?.name;
      closedByAgent[agentName] = (closedByAgent[agentName] || 0) + 1;
    }
  });
  const agentLabels = Object.keys(closedByAgent);
  const agentCounts = Object.values(closedByAgent);

  // 3 status distribution amongs agents
  const statusDistribution = {};
  leadData?.leads?.forEach((lead) => {
    const status = lead.status;
    statusDistribution[status] = (statusDistribution[status] || 0) + 1;
  });

  const statusLabels = Object.keys(statusDistribution);
  const statusCounts = Object.values(statusDistribution);
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Reports" />

          <div className="my-2 border">
            <h5 className="my-3 text-center">
              Total leads closed and In Pipeline || PieChart
            </h5>
            <div className="report-leads">
              <Doughnut
                data={{
                  labels: ["Closed Leads", "In Pipeline"],
                  datasets: [
                    {
                      label: "Leads",
                      data: [closedLeads, pipelinedLeads],
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="my-2 border">
            <h5 className="my-3 text-center">
              Leads Closed by Sales Agent || BarChart
            </h5>

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
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                        precision: 0, 
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="my-2 border">
            <h5 className="my-3 text-center">
              Lead Status Distribution || PieChart
            </h5>
            <div className="report-leads">
              <Doughnut
                data={{
                  labels: statusLabels,
                  datasets: [
                    {
                      label: "Lead Status",
                      data: statusCounts,
                      backgroundColor: [
                        "#36A2EB",
                        "#FF6384",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </main>{" "}
    </>
  );
};

export default Reports;
