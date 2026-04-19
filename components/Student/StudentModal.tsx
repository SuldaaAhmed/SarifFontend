"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

// Aligned with Backend.DTOs.Requests.Students
export interface StudentFormData {
  id?: string;     // Used for Update
  userId: string;  // Used for Create
  isActive: boolean; // Used for Update
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: StudentFormData;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
}

const emptyForm: StudentFormData = {
  userId: "",
  isActive: true,
};

export default function StudentModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<StudentFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(mode === "edit" && initialData ? initialData : emptyForm);
      setErrors({});
    }
  }, [mode, initialData, open]);

  const validate = () => {
    const e: typeof errors = {};
    // Only validate UserId during "add" mode
    if (mode === "add" && !form.userId.trim()) {
      e.userId = "User ID is required to register a student";
    }
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
      console.error("Student processing failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Register New Student" : "Update Student Status"}
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
          {mode === "add" ? (
            /* CREATE MODE: Input User ID */
            <Field label="User ID (Guid)" required error={errors.userId}>
              <Input
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                placeholder="Enter the System User ID"
              />
            </Field>
          ) : (
            /* EDIT MODE: Toggle Active Status */
            <Field label="Account Status">
              <div className="flex items-center gap-3 p-3 border rounded-lg dark:border-gray-700">
                <input
                  type="checkbox"
                  id="isActive"
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {form.isActive ? "Student is Active" : "Student is Inactive"}
                </label>
              </div>
            </Field>
          )}
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
            {loading ? "Processing..." : mode === "add" ? "Create Student" : "Save Changes"}
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