"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerService } from "@/lib/customers";

export interface ServiceItemFormData {
  serviceId: string;
  name: string;
  description: string;
  possiblePrice: number;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: ServiceItemFormData;
  onClose: () => void;
  onSubmit: (data: ServiceItemFormData) => Promise<void>;
}

interface ServiceCategory {
  id: string;
  name: string;
}

const emptyForm: ServiceItemFormData = {
  serviceId: "",
  name: "",
  description: "",
  possiblePrice: 0,
};

export default function ServicesItemFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ServiceItemFormData>(emptyForm);
  const [errors, setErrors] =
    useState<Partial<Record<keyof ServiceItemFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [Category, setCategory] = useState<ServiceCategory[]>([]);
  const [LoadingCategory, setLoadingCategory] = useState(false);

 useEffect(() => {
  if (!open) return;

  const fetch = async () => {
    try {
      setLoadingCategory(true);

      const res = await CustomerService.getAllServices();

      console.log("API RESPONSE:", res.data);

      setCategory(
        Array.isArray(res.data?.data?.data)
          ? res.data.data.data
          : []
      );
    } catch (err) {
      console.error("Failed to load categories", err);
      setCategory([]);
    } finally {
      setLoadingCategory(false);
    }
  };

  fetch();
}, [open]);

  useEffect(() => {
    setForm(mode === "edit" && initialData ? initialData : emptyForm);
    setErrors({});
  }, [mode, initialData, open]);

  const update = (
    key: keyof ServiceItemFormData,
    value: string | number
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.possiblePrice <= 0)
      e.possiblePrice = "Possible price is required";
    if (!form.serviceId.trim()) e.serviceId = "Category is required";

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
            {mode === "add" ? "Add Service Item" : "Edit Service Item"}
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
          <Field label="Service Name" required error={errors.name}>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter service name"
            />
          </Field>

          <Field label="Description" required error={errors.description}>
            <Input
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Enter description"
            />
          </Field>

          <Field label="Possible Price" required error={errors.possiblePrice}>
            <Input
              type="number"
              value={form.possiblePrice}
              onChange={(e) =>
                update("possiblePrice", Number(e.target.value))
              }
              placeholder="Enter possible price"
            />
          </Field>

          <Field label="Service Category" required error={errors.serviceId}>
            <select
              value={form.serviceId}
              onChange={(e) => update("serviceId", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Select category</option>
              {LoadingCategory ? (
                <option disabled>Loading...</option>
              ) : (
                Category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
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
              ? "Create Service"
              : "Update Service"}
          </button>
        </div>
      </div>
    </div>
  );
}

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
