"use client";

import Graph from "@/components/shared/Graph";
const Insight = () => {
  return (
    <div style={{ width: "100%" }}>
      <Graph
        labels={[
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]}
        datasets={[
          {
            label: "",
            data: [10, 20, 15],
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ]}
      />
    </div>
  );
};

export default Insight;
