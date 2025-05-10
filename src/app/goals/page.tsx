"use client";
import { Container, SimpleGrid, Title, Button, Group } from "@mantine/core";
import Goalcard from "@/components/shared/Goalcard";
import Modalcomponent from "@/components/shared/Modelcomponent";
import { Input } from "@/components/shared/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import { showToast } from "@/utils/toster";
import { useRouter } from "next/navigation";

type Goal = {
  id: string;
  title: string;
  description?: string;
  amountSaved: number;
  goalAmount: number;
  daysLeft: number;
  frequencyLabel?: string;
  progressColor?: string;
};

type GoalValue = {
  title: string;
  description: string;
  amount: string;
  frequency: number;
  targetdate: string;
};

const goalSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.string().required("Amount is required"),
  frequency: Yup.number().required("Frequency is required"),
  targetdate: Yup.string().required("Date is required"),
}).required();

const Modalcontent = ({ refreshGoals }: { refreshGoals: () => void }) => {
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<GoalValue>({
    resolver: yupResolver(goalSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      frequency: 0,
      targetdate: "",
    },
  });

  const onSubmit: SubmitHandler<GoalValue> = async (formData) => {
    setFormError(null);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        targetdate: formData.targetdate,
        amountSaved: 0,
      };

      await apiClient.post("/api/auth/users/add/goals", payload);
      showToast({ message: "Goal created" });
      refreshGoals(); // Refresh goals after creation
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || "Failed to create goal";
      setFormError(message);
      showToast({ message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="title" label="Title" control={control} />
      <Input name="description" label="Description" control={control} />
      <Input name="amount" label="Amount" control={control} />
      <Input name="frequency" label="Monthly Target" control={control} />
      <Input name="targetdate" label="Target Date" type="date" control={control} />
      <Button type="submit" fullWidth loading={isSubmitting}>
        Add Goal
      </Button>
    </form>
  );
};

const Goal = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/auth/user/goals");
      setGoals(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <Container my="lg">
      <Title order={2} mb="md">
        Active Goals
      </Title>

      <Group mb="lg">
        <Modalcomponent
          title={"Add new goal"}
          label={"+ New Goal"}
          childern={<Modalcontent refreshGoals={fetchGoals} />}
        />
        <Button variant="outline" radius="md">
          Ask AI
        </Button>
      </Group>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        <SimpleGrid cols={1} spacing="md">
          {goals.map((goal) => (
            <Goalcard key={goal.id} goal={goal} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Goal;
