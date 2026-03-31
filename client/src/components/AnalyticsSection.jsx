function AnalyticsSection({ leads, isOverdue }) {
  const stages = ["Interested", "Negotiating", "Won", "Lost"];

  const leadsByStageData = stages.map((stage) => ({
    name: stage,
    value: leads.filter((lead) => lead.stage === stage).length,
  }));

  const pipelineValueByStageData = stages.map((stage) => ({
    name: stage,
    value: leads
      .filter((lead) => lead.stage === stage)
      .reduce((sum, lead) => sum + Number(lead.value || 0), 0),
  }));

  const followUpStatusData = [
    {
      name: "On Track",
      value: leads.filter((lead) => !isOverdue(lead)).length,
    },
    {
      name: "Overdue",
      value: leads.filter((lead) => isOverdue(lead)).length,
    },
  ];

  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>Analytics Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "16px",
        }}
      >
        <ChartCard title="Leads by Stage" data={leadsByStageData} />
        <ChartCard title="Pipeline Value by Stage" data={pipelineValueByStageData} money />
        <ChartCard title="Follow-up Status" data={followUpStatusData} />
      </div>
    </div>
  );
}

function ChartCard({ title, data, money = false }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "18px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          margin: "0 0 18px 0",
          fontSize: "16px",
          color: "#0f172a",
        }}
      >
        {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {data.map((item) => {
          const widthPercent = (item.value / maxValue) * 100;

          return (
            <div key={item.name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#334155",
                }}
              >
                <span>{item.name}</span>
                <span>{money ? `₹${item.value}` : item.value}</span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "14px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${widthPercent}%`,
                    height: "100%",
                    backgroundColor: "#2563eb",
                    borderRadius: "999px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnalyticsSection;