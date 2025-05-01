"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Container, Paper, Title, Button, Space } from "@mantine/core";
import { Input } from "@/components/shared/Input";
import apiClient from "@/services/apiClient";
import { useRouter } from "next/navigation";

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

const Signup: React.FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { email: "", password: "", name: "" },
  });
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupValues> = async (data) => {
    setFormError(null);

    try {
      const { data: res } = await apiClient.post<any>("api/auth/signup", data);

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", res.token);
      }

      // redirect to dashboard (or wherever)
      router.push("/login");
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Signup failed";
      setFormError(message);
    }
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
