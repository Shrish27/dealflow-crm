import { useState } from "react";

function LeadFormModal({ title, leadData, onClose, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    ...leadData,
    value: leadData.value ?? "",
  });

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "value" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0 }}>{title}</h2>
            <p style={{ margin: "6px 0 0 0", color: "#64748b" }}>
              Fill in the lead details below.
            </p>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Person"
            value={formData.contact}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            style={inputStyle}
          />
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Interested">Interested</option>
            <option value="Negotiating">Negotiating</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          <input
            type="number"
            name="value"
            placeholder="Deal Value"
            value={formData.value}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "90px", resize: "vertical", gridColumn: "1 / -1" }}
          />

          <div style={footerStyle}>
            <button type="button" onClick={onClose} style={secondaryButtonStyle}>
              Cancel
            </button>
            <button type="submit" style={primaryButtonStyle}>
              {submitText}
            </button>
          </div>
        </form>
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
  zIndex: 1100,
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

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "12px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  outline: "none",
};

const footerStyle = {
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "8px",
};

const primaryButtonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#e2e8f0",
  cursor: "pointer",
};

export default LeadFormModal;