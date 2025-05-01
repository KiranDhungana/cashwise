"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Container, Paper, Title, Button, Space } from "@mantine/core";
import { Input } from "@/components/shared/Input";
import apiClient from "@/services/apiClient";
import { useRouter } from "next/navigation";

type LoginValues = {
  email: string;
  password: string;
};

const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Must be a valid email"),
  password: Yup.string().required("Password is required").min(6, "Must be at least 6 characters"),
}).required();

const Login: React.FC = () => {
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginValues> = async (formData) => {
    setFormError(null);
    try {
      const { data: loginResponse } = await apiClient.post<any>("/api/auth/login", formData);

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", loginResponse.token);
      }
      router.push("/home");
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to login";
      setFormError(message);
    }
  };

  return (
    <Container size={400} my={40}>
      <Title>Sign in to your account</Title>
      <Paper withBorder shadow="md" p="xl" mt="xl" radius="md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          />

          <Space h="md" />

          <Button type="submit" fullWidth loading={isSubmitting}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
