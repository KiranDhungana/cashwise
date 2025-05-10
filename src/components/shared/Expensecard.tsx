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
} from "@tabler/icons-react";

const ExpenseCard = ({ title, icon, amount, budget, color }) => {
  const percent = Math.min((amount / budget) * 100, 100);

  return (
    <Card shadow="sm" radius="md" className="p-4">
      <Group position="apart" align="center" className="mb-2">
        <Group spacing="xs">
          <ThemeIcon color={color} variant="light" size="lg">
            {icon}
          </ThemeIcon>
          <Text weight={500}>{title}</Text>
        </Group>
        <Text weight={600}>${amount}</Text>
      </Group>

      <Text size="sm" color="dimmed" className="mb-1">
        {percent.toFixed(0)}% of ${budget}
      </Text>
      <Progress value={percent} color={color} size="md" />
    </Card>
  );
};

export default ExpenseCard;
