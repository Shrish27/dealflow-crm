import { useEffect, useMemo, useState } from "react";
import AnalyticsSection from "./components/AnalyticsSection";
import StatCard from "./components/StatCard";
import LeadRow from "./components/LeadRow";
import LeadModal from "./components/LeadModal";
import LeadFormModal from "./components/LeadFormModal";
import Toast from "./components/Toast";

function App() {
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem("leads");
    return savedLeads
      ? JSON.parse(savedLeads)
      : [
          {
            id: 1,
            company: "Red Bull",
            contact: "Aisha Mehta",
            email: "aisha@redbull.com",
            phone: "9876543210",
            notes: "Interested in sponsorship discussion.",
            followUpDate: "2026-04-05",
            stage: "Negotiating",
            value: 50000,
            createdAt: Date.now() - 30000,
          },
          {
            id: 2,
            company: "TCS",
            contact: "Rahul Shah",
            email: "rahul@tcs.com",
            phone: "9123456780",
            notes: "Asked for proposal deck.",
            followUpDate: "2026-04-07",
            stage: "Interested",
            value: 100000,
            createdAt: Date.now() - 20000,
          },
          {
            id: 3,
            company: "Zomato",
            contact: "Priya Nair",
            email: "priya@zomato.com",
            phone: "9988776655",
            notes: "Deal successfully closed.",
            followUpDate: "2026-04-02",
            stage: "Won",
            value: 40000,
            createdAt: Date.now() - 10000,
          },
        ];
  });

  const emptyLead = {
    company: "",
    contact: "",
    email: "",
    phone: "",
    notes: "",
    followUpDate: "",
    stage: "Interested",
    value: "",
  };

  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("All");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedLead(null);
        setShowAddModal(false);
        setEditingLead(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const todayString = new Date().toISOString().split("T")[0];

  const isOverdue = (lead) => {
    if (!lead.followUpDate) return false;
    return (
      lead.followUpDate < todayString &&
      lead.stage !== "Won" &&
      lead.stage !== "Lost"
    );
  };

  const validateLead = (lead) => {
    if (
      !lead.company.trim() ||
      !lead.contact.trim() ||
      !lead.email.trim() ||
      !lead.phone.trim() ||
      !lead.followUpDate ||
      !lead.value
    ) {
      showToast("Please fill all required fields.", "error");
      return false;
    }
    return true;
  };

  const addLead = (leadData) => {
    if (!validateLead(leadData)) return;

    const leadToAdd = {
      id: Date.now(),
      company: leadData.company.trim(),
      contact: leadData.contact.trim(),
      email: leadData.email.trim(),
      phone: leadData.phone.trim(),
      notes: leadData.notes.trim(),
      followUpDate: leadData.followUpDate,
      stage: leadData.stage,
      value: Number(leadData.value),
      createdAt: Date.now(),
    };

    setLeads((prev) => [...prev, leadToAdd]);
    setShowAddModal(false);
    showToast("Lead added successfully.");
  };

  const updateLead = (leadData) => {
    if (!validateLead(leadData)) return;

    const updatedLead = {
      ...leadData,
      company: leadData.company.trim(),
      contact: leadData.contact.trim(),
      email: leadData.email.trim(),
      phone: leadData.phone.trim(),
      notes: leadData.notes.trim(),
      value: Number(leadData.value),
    };

    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );

    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }

    setEditingLead(null);
    showToast("Lead updated successfully.");
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));

    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }

    if (editingLead && editingLead.id === id) {
      setEditingLead(null);
    }

    showToast("Lead deleted.", "error");
  };

  const updateLeadStage = (id, newStage) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, stage: newStage } : lead
      )
    );

    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => ({ ...prev, stage: newStage }));
    }

    if (editingLead && editingLead.id === id) {
      setEditingLead((prev) => ({ ...prev, stage: newStage }));
    }

    showToast("Lead stage updated.");
  };

  const openLeadModal = (lead) => {
    setSelectedLead(lead);
  };

  const closeLeadModal = () => {
    setSelectedLead(null);
  };

  const startEdit = (lead) => {
    setEditingLead({ ...lead });
  };

  const closeEditModal = () => {
    setEditingLead(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Company",
      "Contact",
      "Email",
      "Phone",
      "Follow Up Date",
      "Stage",
      "Value",
      "Notes",
    ];

    const rows = leads.map((lead) => [
      lead.company,
      lead.contact,
      lead.email,
      lead.phone,
      lead.followUpDate,
      lead.stage,
      lead.value,
      lead.notes,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((field) => `"${String(field ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dealflow_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("CSV exported successfully.");
  };

  const filteredAndSortedLeads = useMemo(() => {
    let updatedLeads = [...leads];

    if (activeTab === "Active") {
      updatedLeads = updatedLeads.filter(
        (lead) => lead.stage === "Interested" || lead.stage === "Negotiating"
      );
    } else if (activeTab === "Won") {
      updatedLeads = updatedLeads.filter((lead) => lead.stage === "Won");
    } else if (activeTab === "Lost") {
      updatedLeads = updatedLeads.filter((lead) => lead.stage === "Lost");
    } else if (activeTab === "Overdue") {
      updatedLeads = updatedLeads.filter((lead) => isOverdue(lead));
    }

    if (searchTerm.trim()) {
      updatedLeads = updatedLeads.filter((lead) => {
        const text =
          `${lead.company} ${lead.contact} ${lead.email} ${lead.phone} ${lead.notes}`.toLowerCase();
        return text.includes(searchTerm.toLowerCase());
      });
    }

    if (stageFilter !== "All") {
      updatedLeads = updatedLeads.filter((lead) => lead.stage === stageFilter);
    }

    switch (sortBy) {
      case "oldest":
        updatedLeads.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "highestValue":
        updatedLeads.sort((a, b) => b.value - a.value);
        break;
      case "lowestValue":
        updatedLeads.sort((a, b) => a.value - b.value);
        break;
      case "followUpSoonest":
        updatedLeads.sort(
          (a, b) => new Date(a.followUpDate) - new Date(b.followUpDate)
        );
        break;
      case "newest":
      default:
        updatedLeads.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    return updatedLeads;
  }, [leads, searchTerm, stageFilter, sortBy, activeTab]);

  const totalLeads = leads.length;
  const activeDeals = leads.filter(
    (lead) => lead.stage === "Interested" || lead.stage === "Negotiating"
  ).length;
  const wonDeals = leads.filter((lead) => lead.stage === "Won").length;
  const lostDeals = leads.filter((lead) => lead.stage === "Lost").length;
  const overdueLeads = leads.filter((lead) => isOverdue(lead)).length;

  const pipelineValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const activePipelineValue = leads
    .filter((lead) => lead.stage === "Interested" || lead.stage === "Negotiating")
    .reduce((sum, lead) => sum + lead.value, 0);

  const upcomingFollowUps = leads.filter((lead) => {
    if (!lead.followUpDate) return false;
    return lead.followUpDate >= todayString;
  }).length;

  const conversionRate =
    totalLeads > 0 ? ((wonDeals / totalLeads) * 100).toFixed(1) : 0;

  const tabs = [
    { label: "All", count: totalLeads },
    { label: "Active", count: activeDeals },
    { label: "Won", count: wonDeals },
    { label: "Lost", count: lostDeals },
    { label: "Overdue", count: overdueLeads },
  ];

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>DealFlow CRM</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="Active Deals" value={activeDeals} />
        <StatCard title="Won Deals" value={wonDeals} />
        <StatCard title="Lost Deals" value={lostDeals} />
        <StatCard title="Overdue Follow-ups" value={overdueLeads} />
        <StatCard title="Pipeline Value" value={`₹${pipelineValue}`} />
        <StatCard title="Active Pipeline" value={`₹${activePipelineValue}`} />
        <StatCard title="Upcoming Follow-ups" value={upcomingFollowUps} />
        <StatCard title="Conversion Rate" value={`${conversionRate}%`} />
      </div>

      <AnalyticsSection leads={leads} isOverdue={isOverdue} />

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: 0 }}>Lead Management</h2>
          <button onClick={() => setShowAddModal(true)} style={primaryButtonStyle}>
            + Add Lead
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ margin: 0 }}>Leads</h2>

          <button onClick={exportToCSV} style={exportButtonStyle}>
            Export CSV
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{
                ...tabButtonStyle,
                ...(activeTab === tab.label ? activeTabButtonStyle : {}),
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Search company, contact, email, phone, notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, minWidth: "260px" }}
          />

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            style={inputStyle}
          >
            <option value="All">All Stages</option>
            <option value="Interested">Interested</option>
            <option value="Negotiating">Negotiating</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={inputStyle}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highestValue">Highest Value</option>
            <option value="lowestValue">Lowest Value</option>
            <option value="followUpSoonest">Follow-up Soonest</option>
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e2e8f0" }}>
                <th style={thStyle}>Company</th>
                <th style={thStyle}>Contact</th>
                <th style={thStyle}>Stage</th>
                <th style={thStyle}>Value</th>
                <th style={thStyle}>Follow-up</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLeads.length > 0 ? (
                filteredAndSortedLeads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    updateLeadStage={updateLeadStage}
                    deleteLead={deleteLead}
                    startEdit={startEdit}
                    openLeadModal={openLeadModal}
                    isOverdue={isOverdue}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && <LeadModal lead={selectedLead} onClose={closeLeadModal} />}

      {showAddModal && (
        <LeadFormModal
          title="Add New Lead"
          leadData={emptyLead}
          onClose={() => setShowAddModal(false)}
          onSubmit={addLead}
          submitText="Add Lead"
        />
      )}

      {editingLead && (
        <LeadFormModal
          title="Edit Lead"
          leadData={editingLead}
          onClose={closeEditModal}
          onSubmit={updateLead}
          submitText="Save Changes"
        />
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  outline: "none",
};

const primaryButtonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const exportButtonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#0f766e",
  color: "#fff",
  cursor: "pointer",
};

const tabButtonStyle = {
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};

const activeTabButtonStyle = {
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "1px solid #2563eb",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #cbd5e1",
};

export default App;