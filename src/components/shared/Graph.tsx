// components/LineChart.tsx
import React from "react";
import { Card, Text, Group, Progress, Button, ThemeIcon } from "@mantine/core";
import {
  IconShoppingCart,
  IconHome,
  IconCar,
  IconMedicalCross,
  IconBulb,
  IconCurrencyDollar,
  IconRobot,
  IconBasket,
} from "@tabler/icons-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { FC } from "react";
import ExpenseCard from "./Expensecard";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

type LineChartProps = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
};

const Graph: FC<LineChartProps> = ({ labels, datasets }) => {
  const data = {
    labels,
    datasets: datasets.map((set) => ({
      ...set,
      fill: false,
      tension: 0.4, // optional: smooth curve
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: {
        legend: { position: "top" as const },
        title: { display: true, text: "Line Chart Example" },
      },
      title: {
        display: true,
        text: "Line Chart Example",
      },
    },
  };
  const expenses = [
    { title: "Shopping", icon: <IconShoppingCart size={20} />, amount: 2450, budget: 2200, color: "red" },
    { title: "Housing", icon: <IconHome size={20} />, amount: 2200, budget: 2500, color: "blue" },
    { title: "Dining", icon: <IconBulb size={20} />, amount: 1015, budget: 1400, color: "red" },
    { title: "Transport", icon: <IconCar size={20} />, amount: 690, budget: 750, color: "pink" },
    { title: "Healthcare", icon: <IconMedicalCross size={20} />, amount: 675, budget: 750, color: "yellow" },
    { title: "Utilities", icon: <IconBulb size={20} />, amount: 400, budget: 400, color: "purple" },
    { title: "Groceries", icon: <IconBasket size={20} />, amount: 400, budget: 650, color: "teal" },
    { title: "Cash", icon: <IconCurrencyDollar size={20} />, amount: 300, budget: 300, color: "gray" },
  ];
  console.log("test");
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <>
      <div style={{ height: 300 /* whatever you need */, width: "100%" }}>
        <Line data={data} options={options} />
      </div>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
          <Group spacing="sm">
            <Button color="green">Create Budget</Button>
            <Button variant="outline">Set Spend Alerts</Button>
          </Group>
          <Button color="violet" leftIcon={<IconRobot size={18} />}>
            Ask AI
          </Button>
        </div>

        {/* Expenses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {expenses.map((exp) => (
            <ExpenseCard key={exp.title} {...exp} />
          ))}
        </div>

        {/* Total spending summary */}
        <div className="flex justify-end mt-6">
          <Text weight={700} size="xl">
            Total Spending: ${total}
          </Text>
        </div>
      </div>
    </>
  );
};

export default Graph;
