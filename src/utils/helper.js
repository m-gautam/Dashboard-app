import { MONTHS } from "./constants";

export const getTotalRevenue = (data) => {
  const revenueData = [];

  data.forEach((element) => {
    const revenue = Object.values(element.month);

    let sum = 0;

    revenue.forEach((rev) => {
      sum += parseInt(rev.replace(/,/g, ""));
    });

    revenueData.push(sum);
  });

  return revenueData;
};

export const getTotalRevenuePerMonth = (data) => {
  let revenuePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  data.forEach((element) => {
    const revenue = element.month;

    MONTHS.forEach((month, k) => {
      revenuePerMonth[k] += parseInt(revenue[month].replace(/,/g, ""));
    });
  });

  return revenuePerMonth;
};

export const sortMonths = (months) => {
  let sortedObject = {
    January: "",
    February: "",
    March: "",
    April: "",
    May: "",
    June: "",
    July: "",
    August: "",
    September: "",
    October: "",
    November: "",
    December: "",
  };

  for (const entry in months) {
    sortedObject[entry] = months[entry];
  }

  return sortedObject;
};

export const calcAverage = (arr) => {
  let sum = 0.0;

  arr.forEach((element) => {
    sum += element;
  });

  for (let i in arr) {
    arr[i] = ((arr[i] / sum) * 100).toFixed(2);
  }

  return arr;
};
