import React from "react";
import BarChart from "./charts/BarChart";
import { analytics, auth } from "./components/firebase";
import "./App.css";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import HorizontalBarChart from "./charts/HorizontalBar";

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <h1 style={{ color: "white" }}>Data Visualization</h1>

        <button
          className="sign-out-btn"
          onClick={() => {
            auth.signOut();
            analytics.logEvent("logout", "logs out user");
          }}
        >
          Sign Out
        </button>
      </div>
      <div className="Home-page">
        <PieChart />
        <BarChart />
        <LineChart />
        <HorizontalBarChart />
      </div>
    </div>
  );
};

export default HomePage;
