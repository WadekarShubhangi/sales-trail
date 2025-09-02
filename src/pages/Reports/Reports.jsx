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
          <div className="my-2 border">PieChart</div>
          <div className="my-2 border report-leads">
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

          <div className="my-2 border">PieChart</div>
          <div className="my-2 border report-leads">
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
                    barThickness: 30, // fix width
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
                      stepSize: 1, // <- y-axis ka interval 1 ho jayega
                      precision: 0, // <- decimal hatane ke liye
                    },
                  },
                },
              }}
            />
          </div>
          <div className="my-2 border">BarOrPie</div>
          <div className="my-2 border report-leads">
            <h5 className="text-center">Lead Status Distribution</h5>
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
      </main>{" "}
    </>
  );
};

export default Reports;
