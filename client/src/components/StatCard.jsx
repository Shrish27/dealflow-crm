function StatCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "18px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#475569" }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#0f172a" }}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;