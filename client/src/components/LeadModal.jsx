function LeadModal({ lead, onClose }) {
  const getStageStyle = (stage) => {
    const baseStyle = {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "bold",
    };

    switch (stage) {
      case "Interested":
        return { ...baseStyle, backgroundColor: "#dbeafe", color: "#1d4ed8" };
      case "Negotiating":
        return { ...baseStyle, backgroundColor: "#fef3c7", color: "#b45309" };
      case "Won":
        return { ...baseStyle, backgroundColor: "#dcfce7", color: "#15803d" };
      case "Lost":
        return { ...baseStyle, backgroundColor: "#fee2e2", color: "#b91c1c" };
      default:
        return baseStyle;
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0 }}>{lead.company}</h2>
            <p style={{ margin: "6px 0 0 0", color: "#64748b" }}>
              Lead Details
            </p>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            ×
          </button>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Contact Information</h3>
            <p><strong>Contact:</strong> {lead.contact || "-"}</p>
            <p><strong>Email:</strong> {lead.email || "-"}</p>
            <p><strong>Phone:</strong> {lead.phone || "-"}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Deal Information</h3>
            <p><strong>Stage:</strong> <span style={getStageStyle(lead.stage)}>{lead.stage}</span></p>
            <p><strong>Value:</strong> ₹{lead.value || 0}</p>
            <p><strong>Follow-up Date:</strong> {lead.followUpDate || "-"}</p>
          </div>

          <div style={{ ...cardStyle, gridColumn: "1 / -1" }}>
            <h3 style={sectionTitleStyle}>Notes</h3>
            <p style={{ margin: 0, lineHeight: "1.6" }}>
              {lead.notes ? lead.notes : "No notes added yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#ffffff",
  width: "100%",
  maxWidth: "760px",
  borderRadius: "16px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  padding: "24px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "20px",
};

const closeButtonStyle = {
  border: "none",
  background: "#e2e8f0",
  borderRadius: "8px",
  width: "36px",
  height: "36px",
  fontSize: "22px",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
};

const cardStyle = {
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  padding: "16px",
};

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "12px",
  color: "#0f172a",
};

export default LeadModal;