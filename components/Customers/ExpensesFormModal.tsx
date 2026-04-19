"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerService } from "@/lib/customers";

export interface ExpensesFormData {
  expenseCategoryId: string;
  amount: number;
  remark: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: ExpensesFormData;
  onClose: () => void;
  onSubmit: (data: ExpensesFormData) => Promise<void>;
}

const emptyForm: ExpensesFormData = {
  expenseCategoryId: "",
  amount: 0,
  remark: "",
};

interface ExpensesCategory {
  id: string;
  name: string;
}

export default function ExpensesFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ExpensesFormData>(() => ({
    ...emptyForm,
  }));

  const [errors, setErrors] =
    useState<Partial<Record<keyof ExpensesFormData, string>>>({});

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<ExpensesCategory[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  /* =========================
     LOAD CATEGORIES
  ========================= */
  useEffect(() => {
    if (!open) return;

    const fetch = async () => {
      try {
        setLoadingCategory(true);

        const res = await CustomerService.getAllExpensesCategories();

        const data = res?.data?.data?.data;

        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load categories", err);
        setCategories([]);
      } finally {
        setLoadingCategory(false);
      }
    };

    fetch();
  }, [open]);

  /* =========================
     SET INITIAL DATA SAFELY
  ========================= */
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        amount: Number(initialData.amount) || 0,
      });
    } else {
      setForm({ ...emptyForm });
    }

    setErrors({});
  }, [mode, initialData, open]);

  /* =========================
     UPDATE FIELD
  ========================= */
  const update = (
    key: keyof ExpensesFormData,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        key === "amount"
          ? Number(value)
          : value ?? "",
    }));
  };

  /* =========================
     VALIDATION SAFE
  ========================= */
  const validate = () => {
    const e: typeof errors = {};

    if (!form.expenseCategoryId || !form.expenseCategoryId.trim()) {
      e.expenseCategoryId = "Category is required";
    }

    if (!form.amount || form.amount <= 0) {
      e.amount = "Valid amount is required";
    }

    if (!form.remark || !form.remark.trim()) {
      e.remark = "Remark is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    if (!validate() || loading) return;

    try {
      setLoading(true);
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
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
            {mode === "add" ? "Add Expense" : "Edit Expense"}
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
          <Field
            label="Expense Category"
            required
            error={errors.expenseCategoryId}
          >
            <select
              value={form.expenseCategoryId}
              onChange={(e) =>
                update("expenseCategoryId", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Select category</option>

              {loadingCategory ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </Field>

          <Field label="Amount" required error={errors.amount}>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) =>
                update("amount", e.target.value)
              }
              placeholder="Enter amount"
            />
          </Field>

          <Field label="Remark" required error={errors.remark}>
            <Input
              value={form.remark}
              onChange={(e) =>
                update("remark", e.target.value)
              }
              placeholder="Enter remark"
            />
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
              ? "Create Expense"
              : "Update Expense"}
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

      {error && (
        <p className="text-sm text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}
