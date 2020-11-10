import { Pie } from "react-chartjs-2";
import React, { useCallback, useEffect, useState } from "react";
import { firestore } from "../components/firebase";
import Select from "react-dropdown-select";

import { calcAverage, getTotalRevenue } from "../utils/helper";
import { COUNTRY_OPTIONS } from "../utils/constants";

const PieChart = () => {
  const [country, setCountry] = useState("India");

  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);

  const options = COUNTRY_OPTIONS;

  const state = {
    labels: labels,
    datasets: [
      {
        label: "Total Revenue",
        backgroundColor: [
          "#573366",
          "#9a2337",
          "#277256",
          "#1b6c98",
          "#e1a005",
          "#808080",
        ],
        data: chartData,
      },
    ],
  };

  const fetchData = useCallback(() => {
    firestore
      .collection("companies")
      .where("Country", "==", country)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const id = querySnapshot.docs.map((doc) => doc.id);
        const revenueDataArray = getTotalRevenue(data);

        const averageArray = calcAverage(revenueDataArray);

        setLabels(id);

        setChartData(averageArray);
      });
  }, [country]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2 className="sub-header">
        Below visualization represents the share of revenue of companies belongs
        to a country.
      </h2>
      <div className="dropdown">
        <Select
          options={options}
          onChange={(value) => {
            setCountry(value[0].value);
          }}
        />
      </div>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: `Revenue of companies in ${country}`,
            fontSize: 20,
            fontColor: "#474646",
            position: "bottom",
            fontFamily: "Roboto",
          },
          legend: {
            display: true,
            position: "chartArea",
          },
        }}
      />
    </div>
  );
};

export default PieChart;
