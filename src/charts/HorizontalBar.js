import React, { useEffect, useCallback, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import Select from "react-dropdown-select";
import { firestore } from "../components/firebase";
import { COMPANY_OPTIONS, MONTHS } from "../utils/constants";
import { sortMonths } from "../utils/helper";

const HorizontalBarChart = () => {
  const [company1, setCompany1] = useState("Google");
  const [company2, setCompany2] = useState("Apple");

  const [revenue1, setRevenue1] = useState([]);
  const [revenue2, setRevenue2] = useState([]);

  const options = COMPANY_OPTIONS;

  const graphData = {
    labels: MONTHS,
    datasets: [
      {
        label: company1,
        backgroundColor: "#aa394c",
        data: revenue1,
      },
      {
        label: company2,
        backgroundColor: "#1b3455",
        data: revenue2,
      },
    ],
  };

  const fetchData = useCallback(() => {
    firestore
      .collection("/companies")
      .doc(company1)
      .get()
      .then((doc) => {
        const data = doc.data();

        const monthRevenue = sortMonths(data.month);

        // converting revenue value of company for each month from string to int
        const valuArr = [];
        Object.values(monthRevenue).forEach((element) => {
          valuArr.push(parseInt(element.replace(/,/g, "")));
        });

        // set the hook values for labels and values
        setRevenue1(valuArr);
      });

    firestore
      .collection("/companies")
      .doc(company2)
      .get()
      .then((doc) => {
        const data = doc.data();

        const monthRevenue = sortMonths(data.month);

        // converting revenue value of company for each month from string to int
        const valuArr = [];
        Object.values(monthRevenue).forEach((element) => {
          valuArr.push(parseInt(element.replace(/,/g, "")));
        });

        // set the hook values for labels and values
        setRevenue2(valuArr);
      });
  }, [company1, company2]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2 className="sub-header">
        Below visualization represents comparison of revenue generated by
        companies for each month.
      </h2>
      <div className="two-dropdown">
        <div className="dropdown-width">
          <Select
            options={options}
            onChange={(value) => {
              setCompany1(value[0].value);
            }}
          />
        </div>
        <div className="dropdown-width">
          <Select
            options={options}
            onChange={(value) => {
              setCompany2(value[0].value);
            }}
          />
        </div>
      </div>
      <HorizontalBar
        data={graphData}
        options={{
          scales: {
            yAxes: [
              {
                barPercentage: 1.4,
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default HorizontalBarChart;
