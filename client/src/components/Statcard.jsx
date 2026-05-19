import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="card">
      <h4
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h1>{value}</h1>
    </div>
  );
};

export default StatCard;