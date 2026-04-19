"use client";

import React, { useEffect, useState, useCallback } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { X, Save } from "lucide-react";
import { SetupService } from "@/lib/setup";

export interface MenuFormData {
  title: string;
  href: string;
  icon: string;
  parentId: string;
  orderNo: string;
  moduleId: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: MenuFormData;
  onClose: () => void;
  onSubmit: (data: any) => void; // Changed to any to allow processed payload
}

const emptyForm: MenuFormData = {
  title: "",
  href: "",
  icon: "",
  parentId: "", // Changed from "null" string to empty string for cleaner logic
  orderNo: "",
  moduleId: "",
};

export default function MenuFormModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<MenuFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof MenuFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<any[]>([]);
  const [moduleLoading, setModuleLoading] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setModuleLoading(true);
        const res = await SetupService.getModules(1, 100);
        const items = res.data?.data?.data || [];
        setModules(Array.isArray(items) ? items : []);
      } catch (err) {
        console.error("Failed to load modules", err);
        setModules([]);
      } finally {
        setModuleLoading(false);
      }
    };

    if (open) {
      fetchModules();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setForm({ ...initialData });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [mode, initialData, open]);

  const update = (k: keyof MenuFormData, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.href.trim()) e.href = "URL (href) is required";
    if (!form.moduleId.trim()) e.moduleId = "Module is required";
    if (!form.orderNo) e.orderNo = "Order number is required";

    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, handleEsc]);

  // --- FIXED SUBMIT LOGIC ---
  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);

    try {
      // Prepare the payload to match C# CreateMenuDto types (int and null)
      const payload = {
        title: form.title,
        href: form.href || null,
        icon: form.icon || null,
        // Convert empty or "null" strings to actual null, otherwise parse to Int
        parentId: (form.parentId === "" || form.parentId === "null") ? null : parseInt(form.parentId, 10),
        // Convert orderNo and moduleId strings to actual numbers
        orderNo: parseInt(form.orderNo, 10) || 0,
        moduleId: parseInt(form.moduleId, 10)
      };

      await onSubmit(payload);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const selectClassName = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#090044] focus:ring-2 focus:ring-[#00bf63] outline-none appearance-none disabled:opacity-50 transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-none p-4">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-gray-100 dark:border-gray-800 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {mode === "add" ? "Add New Menu Item" : "Edit Menu Item"}
          </h3>
          <button 
            onClick={onClose} 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Menu Title" required error={errors.title}>
              <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Dashboard" />
            </Field>

            <Field label="URL (Href)" required error={errors.href}>
              <Input value={form.href} onChange={(e) => update("href", e.target.value)} placeholder="e.g. /dashboard" />
            </Field>

            <Field label="Icon Name" error={errors.icon}>
              <Input value={form.icon} onChange={(e) => update("icon", e.target.value)} placeholder="e.g. LayoutDashboard" />
            </Field>

            <Field label="Order Number" required error={errors.orderNo}>
              <Input type="number" value={form.orderNo} onChange={(e) => update("orderNo", e.target.value)} placeholder="0" />
            </Field>

            <Field label="Module" required error={errors.moduleId}>
              <select
                disabled={moduleLoading}
                className={selectClassName}
                value={form.moduleId}
                onChange={(e) => update("moduleId", e.target.value)}
              >
                <option value="">{moduleLoading ? "Loading..." : "Select Module"}</option>
                {Array.isArray(modules) && modules.map((mod) => (
                  <option key={mod.id} value={mod.id.toString()}>
                    {mod.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Parent Menu (Optional)" error={errors.parentId}>
               <Input value={form.parentId} onChange={(e) => update("parentId", e.target.value)} placeholder="Parent ID" />
            </Field>
          </div>
        </div>

        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end items-center gap-3 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
          >
            {loading ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {mode === "add" ? "Create Menu" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean }) {
  return (
    <div className="space-y-1">
      <Label className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-[11px] font-medium text-red-500">{error}</p>}
    </div>
  );
}