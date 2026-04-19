import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/complaints/")
      .then(res => res.json())
      .then(data => setComplaints(data));
  }, []);

  return (
    <div>
      <h2>📊 Complaints Dashboard</h2>

      {complaints.map((c, i) => (
        <div key={i} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>{c.name}</b> ({c.email})</p>
          <p>Type: {c.issue_type}</p>
          <p>{c.message}</p>

          {c.screenshot && (
            <img
              src={`http://127.0.0.1:8000${c.screenshot}`}
              width="200"
              alt="screenshot"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;