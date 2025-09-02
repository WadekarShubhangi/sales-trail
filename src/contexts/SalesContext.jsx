import useFetch from "../useFetch";
import { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

const SalesContext = createContext();
export default SalesContext;

export function SalesProvider({ children }) {
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeAgent, setActiveAgent] = useState("All");
  const [sortByTime, setSortByTime] = useState("All");
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    tags: "",
    timeToClose: "",
    priority: "Medium",
  });
  const [commentFormData, setCommentFormData] = useState({
    lead: "",
    author: "",
    commentText: "",
    createdAt: "",
  });
  const [agentFormData, setAgentFormData] = useState({
    name: "",
    email: "",
  });

  const {
    data: leadData,
    loading: leadLoading,
    error: leadError,
    refetch: leadRefetch,
  } = useFetch("https://sales-trail.vercel.app/leads");

  const {
    data: agentsData,
    loading: agentsLoading,
    error: agentsError,
    refetch: agentsRefetch,
  } = useFetch("https://sales-trail.vercel.app/agents");

  let filteredData = leadData?.leads?.filter((lead) => {
    const statusMatch = activeStatus === "All" || lead.status === activeStatus;
    const agentMatch =
      activeAgent === "All" || lead.salesAgent.name === activeAgent;
    return statusMatch && agentMatch;
  });

  if (sortByTime === "Low to High") {
    filteredData = [...filteredData].sort(
      (a, b) => a.timeToClose - b.timeToClose
    );
  } else if (sortByTime === "High to Low") {
    filteredData = [...filteredData].sort(
      (a, b) => b.timeToClose - a.timeToClose
    );
  }

  const leadHandleChange = (e) => {
    const { name, value } = e.target;
    setLeadFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const leadHandleSubmit = (e) => {
    e.preventDefault();

    fetch("https://sales-trail.vercel.app/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...leadFormData,
        tags: leadFormData.tags.split(",").map((tag) => tag.trim()),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Lead added successfully!");
        leadRefetch();
        setLeadFormData({
          name: "",
          source: "",
          salesAgent: "",
          status: "New",
          tags: "",
          timeToClose: "",
          priority: "Medium",
        });
      })
      .catch((err) => {
        console.error("Error adding Leads:", err);
      });
  };

  const resetFilters = useCallback(() => {
    setActiveStatus("All");
    setActiveAgent("All");
    setSortByTime("All");
  }, []);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleCommentSubmit(e, leadId, authorId, commentRefetch) {
    e.preventDefault();
    fetch(`https://sales-trail.vercel.app/leads/${leadId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lead: leadId,
        author: authorId,
        commentText: commentFormData.commentText,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Comment added successfully!");
        commentRefetch();
        setCommentFormData((prev) => ({
          ...prev,
          commentText: "",
        }));
      })
      .catch((err) => {
        console.error("Error adding Comments:", err);
      });
  }

  const updateLead = (leadId, updatedData) => {
    fetch(`https://sales-trail.vercel.app/leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedData,
        tags: updatedData.tags
          ? updatedData.tags.split(",").map((tag) => tag.trim())
          : [],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Lead updated successfully!");
        leadRefetch();
        setLeadFormData({
          name: "",
          source: "",
          salesAgent: "",
          status: "New",
          tags: "",
          timeToClose: "",
          priority: "Medium",
        });
      })
      .catch((err) => console.error("Error updating Lead:", err));
  };

  const agentHandleChange = (e) => {
    const { name, value } = e.target;
    setAgentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agentHandleSubmit = (e) => {
    e.preventDefault();

    fetch("https://sales-trail.vercel.app/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agentFormData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Agent added successfully!");
        agentsRefetch(); 
        setAgentFormData({ name: "", email: "" });
      })
      .catch((err) => console.error("Error adding agent:", err));
  };

  return (
    <SalesContext.Provider
      value={{
        leadData,
        leadLoading,
        leadError,
        leadRefetch,

        agentsData,
        agentsLoading,
        agentsError,
        agentsRefetch,

        closeSideBar,
        setCloseSideBar,

        filteredData,
        resetFilters,
        setActiveStatus,
        setActiveAgent,
        sortByTime,
        setSortByTime,

        leadHandleChange,
        leadHandleSubmit,

        handleCommentChange,
        handleCommentSubmit,

        commentFormData,
        setCommentFormData,

        setLeadFormData,
        leadFormData,

        updateLead,

        agentFormData,
        setAgentFormData,
        agentHandleChange,
        agentHandleSubmit,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}
