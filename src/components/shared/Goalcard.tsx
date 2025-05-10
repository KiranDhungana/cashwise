// components/ActiveGoalCard.tsx

import { Card, Progress, Group, Text, Stack, Badge, rem, useMantineTheme, Flex } from "@mantine/core";
import { Clock } from "tabler-icons-react";
import { Goal } from "@/types/goal";
import { IconClock } from "@tabler/icons-react";

interface ActiveGoalCardProps {
  goal: Goal;
}

const GoalCard = ({ goal }: ActiveGoalCardProps) => {
  const percent = (goal.amountSaved / goal.goalAmount) * 100;

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Stack spacing="xs">
        <Group position="apart" align="flex-start">
          <Stack spacing={0}>
            <Text w={600}>{goal.title}</Text>
            {goal.description && (
              <Text size="sm" color="dimmed">
                {goal.description}
              </Text>
            )}
          </Stack>
          <Badge variant="outline">{percent.toFixed(1)}%</Badge>
        </Group>

        <Progress
          value={percent}
          size="sm"
          radius="xl"
          styles={{
            bar: {
              backgroundColor: goal.progressColor ?? "red",
            },
          }}
        />

        <Group position="apart" spacing="xs" mt="xs">
          <Text size="sm" w={500}>
            ${goal.amountSaved.toLocaleString()} saved
          </Text>
          <Text size="sm" color="dimmed">
            of ${goal.goalAmount.toLocaleString()}
          </Text>
        </Group>

        <Group spacing="xs">
          <IconClock size={14}></IconClock>
          <Text size="xs" color="dimmed">
            {goal.daysLeft} days left
          </Text>
        </Group>

        <Text size="xs" color="dimmed" align="right">
          Monthly Target : {goal.frequencyLabel}
        </Text>
      </Stack>
    </Card>
  );
};

export default GoalCard;
