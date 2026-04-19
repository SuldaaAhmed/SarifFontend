"use client";
import { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { packageService } from "@/lib/packages";

export interface PackageReuestFormData {
  name: string;
  email: string;
  phone: string;
  packageId: string;
  message: string;
  status:string;
}

interface Package {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: PackageReuestFormData;
  onClose: () => void;
  onSubmit: (data: PackageReuestFormData) => void;
}

const emptyForm: PackageReuestFormData = {
  name: "",
  packageId: "",
  message: "",
  phone: "",
  email: "",
  status:"pending",
};

export default function PackageRequestFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<PackageReuestFormData>(emptyForm);
  const [errors, setErrors] =
    useState<Partial<Record<keyof PackageReuestFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  const [packages, setPackages] = useState<Package[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchPackages = async () => {
      try {
        setLoadingPackages(true);

        const res = await packageService.getPackages();

        // ✅ CORRECT: use the array
        setPackages(res.data.data);
      } catch (err) {
        console.error("Failed to load packages", err);
        setPackages([]); // safety fallback
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [open]);

  useEffect(() => {
    setForm(
      mode === "edit" && initialData ? initialData : emptyForm
    );
    setErrors({});
  }, [mode, initialData, open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  const update = (k: keyof PackageReuestFormData, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.packageId.trim()) e.packageId = "Package is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Centered */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Add Package Request" : "Edit Package Request"}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Customer Name" required error={errors.name}>
            <Input 
              value={form.name} 
              onChange={(e) => update("name", e.target.value)} 
              placeholder="Enter customer name"
            />
          </Field>

          <Field label="Phone" required error={errors.phone}>
            <Input 
              value={form.phone} 
              onChange={(e) => update("phone", e.target.value)} 
              placeholder="Enter phone number"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <Input 
              type="email"
              value={form.email} 
              onChange={(e) => update("email", e.target.value)} 
              placeholder="Enter email address"
            />
          </Field>

          <Field label="Package" required error={errors.packageId}>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              value={form.packageId}
              onChange={(e) => update("packageId", e.target.value)}
              disabled={loadingPackages}
            >
              <option value="">
                {loadingPackages ? "Loading packages..." : "Select a package"}
              </option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </Field>


<Field label="Status" required error={errors.status}>
  <select
    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
    value={form.status}
    onChange={(e) => update("status", e.target.value)}
  >
    <option value="">Select a status</option>

    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </select>
</Field>





          <Field label="Message" required error={errors.message} className="md:col-span-2">
            <textarea
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition min-h-[100px] resize-y"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Enter your message or request details..."
              rows={4}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3">
          <button
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium shadow-lg shadow-blue-500/20"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Saving..." : mode === "add" ? "Create Request" : "Update Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Helper ---------- */
function Field({
  label,
  children,
  error,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}