"use client";
import { Container, SimpleGrid, Title, Button, Group } from "@mantine/core";
import Goalcard from "@/components/shared/Goalcard";
import Modalcomponent from "@/components/shared/Modelcomponent";
import { Input } from "@/components/shared/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import apiClient from "@/services/apiClient";
import { showToast } from "@/utils/toster";
import { useRouter } from "next/navigation";
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Test",
    description: "new goal",
    amountSaved: 0,
    goalAmount: 500,
    daysLeft: 180,
    frequencyLabel: "$84 monthly",
  },
  {
    id: "2",
    title: "New Bike",
    amountSaved: 0,
    goalAmount: 100,
    daysLeft: 166,
    frequencyLabel: "$17 monthly",
  },
  {
    id: "3",
    title: "Christmas Gift Fund",
    description: "Saving for Christmas gifts",
    amountSaved: 160,
    goalAmount: 200,
    daysLeft: -133,
    frequencyLabel: "$20 weekly",
    progressColor: "#6f42c1",
  },
];

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
  amount: Yup.string().required("Password is required"),
  frequency: Yup.number().required("Frequency is required"),
  targetdate: Yup.string().required("Date is required"),
}).required();
const Modalcontent = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<GoalValue>({
    resolver: yupResolver(goalSchema),
    defaultValues: { title: "", description: "", amount: "", frequency: 0, targetdate: "" },
  });
  const onSubmit: SubmitHandler<GoalValue> = async (formData) => {
    setFormError(null);
    try {
      console.log(formData);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to login";
      setFormError(message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="title" label="Title" control={control}></Input>
        <Input name="description" label="Description" control={control}></Input>
        <Input name="amount" label="Amount" control={control}></Input>
        <Input name="frequency" label="Monthly Target" control={control}></Input>
        <Input name="targetdate" label="Target Date" type="date" control={control}></Input>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Add Goal
        </Button>
      </form>
    </div>
  );
};

const Goal = () => {
  return (
    <Container my="lg">
      <Title order={2} mb="md">
        Active Goals
      </Title>

      <Group mb="lg">
        <Modalcomponent
          title={"Add new goal"}
          label={"+New Goal "}
          childern={<Modalcontent></Modalcontent>}
        ></Modalcomponent>
        <Button variant="outline" radius="md">
          Ask AI
        </Button>
      </Group>

      <SimpleGrid cols={1} spacing="md">
        {mockGoals.map((goal) => (
          <Goalcard key={goal.id} goal={goal} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Goal;
