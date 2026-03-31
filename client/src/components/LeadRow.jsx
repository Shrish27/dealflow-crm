function LeadRow({
  lead,
  updateLeadStage,
  deleteLead,
  startEdit,
  openLeadModal,
  isOverdue,
}) {
  const overdue = isOverdue(lead);

  const getStageBadgeStyle = (stage) => {
    const baseStyle = {
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "bold",
      border: "none",
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

  return (
    <tr style={overdue ? overdueRowStyle : rowStyle}>
      <td style={tdStyle}>{lead.company}</td>
      <td style={tdStyle}>{lead.contact}</td>
      <td style={tdStyle}>
        <select
          value={lead.stage}
          onChange={(e) => updateLeadStage(lead.id, e.target.value)}
          style={getStageBadgeStyle(lead.stage)}
        >
          <option value="Interested">Interested</option>
          <option value="Negotiating">Negotiating</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </td>
      <td style={tdStyle}>₹{lead.value}</td>
      <td style={tdStyle}>{lead.followUpDate || "-"}</td>
      <td style={tdStyle}>
        {overdue ? <span style={overdueBadgeStyle}>Overdue</span> : <span style={okBadgeStyle}>On Track</span>}
      </td>
      <td style={tdStyle}>
        <button
          onClick={() => openLeadModal(lead)}
          style={{ ...buttonStyle, backgroundColor: "#2563eb", color: "#fff" }}
        >
          View
        </button>
        <button onClick={() => startEdit(lead)} style={{ ...buttonStyle, marginLeft: "8px" }}>
          Edit
        </button>
        <button
          onClick={() => deleteLead(lead.id)}
          style={{ ...buttonStyle, marginLeft: "8px", backgroundColor: "#dc2626", color: "#fff" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

const rowStyle = {
  borderBottom: "1px solid #e2e8f0",
};

const overdueRowStyle = {
  borderBottom: "1px solid #fecaca",
  backgroundColor: "#fff7f7",
};

const tdStyle = {
  padding: "12px",
  verticalAlign: "middle",
};

const buttonStyle = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#e2e8f0",
};

const overdueBadgeStyle = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
  backgroundColor: "#fee2e2",
  color: "#b91c1c",
};

const okBadgeStyle = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
  backgroundColor: "#dcfce7",
  color: "#15803d",
};

export default LeadRow;