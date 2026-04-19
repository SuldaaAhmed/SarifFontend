"use client";

import { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { toast } from "react-hot-toast";

// =========================
// Types
// =========================
export type PackageType = "Marketing" | "Software" | "Creative";

export interface PackageFormData {
  name: string;
  description: string;
  price: number;
  type: PackageType;
  features: string[];
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: PackageFormData;
  onClose: () => void;
  onSubmit: (data: PackageFormData) => Promise<void> | void;
}

// =========================
// Defaults
// =========================
const emptyForm: PackageFormData = {
  name: "",
  description: "",
  price: 0,
  type: "Marketing",
  features: [],
};

export default function PackageFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<PackageFormData>(emptyForm);
  const [featureInput, setFeatureInput] = useState("");
  const [errors, setErrors] =
    useState<Partial<Record<keyof PackageFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    setForm(mode === "edit" && initialData ? initialData : emptyForm);
    setErrors({});
    setFeatureInput("");
  }, [mode, initialData, open]);

  // =========================
  // UPDATE
  // =========================
  const update = <K extends keyof PackageFormData>(
    key: K,
    value: PackageFormData[K]
  ) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // =========================
  // FEATURES
  // =========================
  const addFeature = () => {
    if (!featureInput.trim()) return;
    update("features", [...form.features, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (i: number) => {
    update(
      "features",
      form.features.filter((_, idx) => idx !== i)
    );
  };

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.price <= 0) e.price = "Price must be greater than 0";
    if (!form.type) e.type = "Type is required";

    Object.values(e).forEach((m) => m && toast.error(m));
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // =========================
  // SUBMIT
  // =========================
  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="border-b p-4 text-center text-lg font-semibold dark:border-gray-800">
          {mode === "add" ? "Add Package" : "Edit Package"}
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          <Field label="Package Name" required error={errors.name}>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>

          <Field label="Price" required error={errors.price}>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </Field>

          <Field label="Package Type" required error={errors.type}>
            <select
              className="w-full rounded-md border px-3 py-2 dark:bg-gray-800"
              value={form.type}
              onChange={(e) =>
                update("type", e.target.value as PackageType)
              }
            >
              <option value="Marketing">Marketing</option>
              <option value="Software">Software</option>
              <option value="Creative">Creative</option>
            </select>
          </Field>

          <div className="hidden md:block" />

          <Field label="Description" full required error={errors.description}>
            <textarea
              rows={3}
              className="w-full rounded-md border px-3 py-2 dark:bg-gray-800"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>

          <Field label="Features" full>
            <div className="flex gap-2">
              <Input
                placeholder="Enter feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addFeature}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
              >
                Add
              </button>
            </div>

            {/* Scrollable Features List */}
            <div className="mt-3 max-h-48 overflow-y-scroll">
              <ul className="space-y-2">
                {form.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800"
                  >
                    {f}
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeFeature(i)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Field>
        </div>

        {/* Footer - Fixed Submit Button */}
        <div className="flex justify-end gap-2 border-t p-4 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : mode === "add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Field Helper
========================= */
function Field({
  label,
  children,
  error,
  required,
  full,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
