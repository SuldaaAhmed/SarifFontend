"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export interface CustomerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  type: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: CustomerFormData;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => Promise<void>;
}

const emptyForm: CustomerFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  gender: "",
  type: "",
};

export default function CustomerFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CustomerFormData>(emptyForm);
  const [errors, setErrors] =
    useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(mode === "edit" && initialData ? initialData : emptyForm);
    setErrors({});
  }, [mode, initialData, open]);

  const update = (key: keyof CustomerFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};

    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.type) e.type = "Type is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Add Customer" : "Edit Customer"}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Full Name" required error={errors.fullName}>
            <Input
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Enter full name"
            />
          </Field>

          <Field label="Email" required error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Enter email address"
            />
          </Field>

          <Field label="Phone Number" required error={errors.phoneNumber}>
            <Input
              value={form.phoneNumber}
              onChange={(e) => update("phoneNumber", e.target.value)}
              placeholder="Enter phone number"
            />
          </Field>

          <Field label="Address" required error={errors.address}>
            <Input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Enter address"
            />
          </Field>

          <Field label="Gender">
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white"
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </Field>

          <Field label="Customer Type" required error={errors.type}>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white"
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Corporate">Corporate</option>
            </select>
          </Field>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading
              ? "Saving..."
              : mode === "add"
              ? "Create Customer"
              : "Update Customer"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Field Component ---------- */

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
