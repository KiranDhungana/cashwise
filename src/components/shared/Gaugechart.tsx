"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import "chartjs-plugin-datalabels";
import { Box, Text } from "@mantine/core";

ChartJS.register(ArcElement, Tooltip);

const percent = 80.3;

const data = {
  datasets: [
    {
      data: [percent, 100 - percent],
      backgroundColor: ["linear-gradient(90deg, #00CDAC, #8E2DE2)", "#eaeaea"],
      borderWidth: 0,
      cutout: "70%",
      circumference: 180,
      rotation: 270,
    },
  ],
};

const options = {
  rotation: -90,
  circumference: 180,
  cutout: "70%",
  plugins: {
    tooltip: { enabled: false },
  },
};

function Gaugechart() {
  return (
    <Box style={{ position: "relative", width: 150, height: 100 }}>
      <Doughnut data={data} options={options} />
      <Box
        style={{
          position: "absolute",
          top: "100%",
          left: "35%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Text className="pt-[14px] text-[14px]">{percent}%</Text>
        <Text size="sm">of income spent</Text>
      </Box>
    </Box>
  );
}

export default Gaugechart;
