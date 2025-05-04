"use client";
import React from "react";
import type { FieldError } from "react-hook-form";
import { Controller, SubmitHandler } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  control: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ name, label, control, inputProps, type }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
      <div style={{ marginBottom: 16 }}>
        <label htmlFor={name} style={{ display: "block", marginBottom: 4 }}>
          {label}
        </label>
        <input
          type={type}
          id={name}
          {...inputProps}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          className="input-error"
        />
        {error && <p style={{ color: "red", fontSize: "0.85em", marginTop: 4 }}>{(error as FieldError).message}</p>}
      </div>
    )}
  />
);
