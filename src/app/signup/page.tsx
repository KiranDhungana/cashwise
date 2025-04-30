"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MantineProvider, Container, Paper, Title, Button, Space } from "@mantine/core";
import { Input } from "@/components/shared/Input";

type SignupValues = {
  name: string;
  email: string;
  password: string;
};

const signupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Must be a valid email"),
  password: Yup.string().required("Password is required").min(6, "Must be at least 6 characters"),
}).required();

export const Signup: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit: SubmitHandler<SignupValues> = (data) => {
    console.log("Logging in with", data);
  };

  return (
    <Container size={400} my={40}>
      <Title>Sigup in to your account</Title>
      <Paper withBorder shadow="md" p="xl" mt="xl" radius="md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name="name"
            label="Name"
            control={control}
            inputProps={{
              type: "text",
              placeholder: "your name",
            }}
          />
          <Input
            name="email"
            label="Email"
            control={control}
            inputProps={{
              type: "email",
              placeholder: "you@example.com",
            }}
          />
          <Input
            name="password"
            label="Password"
            control={control}
            inputProps={{
              type: "password",
              placeholder: "••••••••",
            }}
          />{" "}
          <Space h="md" />
          <Button type="submit" fullWidth loading={isSubmitting}>
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
