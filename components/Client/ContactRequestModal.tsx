"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

// Aligned with Backend.DTOs.Requests.Identity.CreateContactRequest
export interface ContactRequestFormData {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  status?: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: ContactRequestFormData;
  onClose: () => void;
  onSubmit: (data: ContactRequestFormData) => Promise<void>;
}

const emptyForm: ContactRequestFormData = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  status: "Pending",
};

export default function ContactRequestModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ContactRequestFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactRequestFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(mode === "edit" && initialData ? initialData : emptyForm);
      setErrors({});
    }
  }, [mode, initialData, open]);

  const update = (key: keyof ContactRequestFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};

    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.message.trim()) e.message = "Message is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Create Contact Request" : "Edit Contact Request"}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Full Name" required error={errors.fullName}>
              <Input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </Field>

            <Field label="Email Address" required error={errors.email}>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="example@mail.com"
              />
            </Field>

            <Field label="Phone Number" required error={errors.phone}>
              <Input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+123456789"
              />
            </Field>

            <Field label="Status">
              <select
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </Field>
          </div>

          <Field label="Message" required error={errors.message}>
            <textarea
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="How can we help you?"
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
          >
            {loading ? "Processing..." : mode === "add" ? "Send Request" : "Update Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Field Component ---------- */

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
    <div className="w-full">
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}