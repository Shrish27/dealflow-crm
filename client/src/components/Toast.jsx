import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const backgroundColor =
    type === "error" ? "#dc2626" : type === "info" ? "#2563eb" : "#16a34a";

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        backgroundColor,
        color: "#fff",
        padding: "14px 18px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        zIndex: 1200,
        minWidth: "240px",
        fontWeight: "500",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;