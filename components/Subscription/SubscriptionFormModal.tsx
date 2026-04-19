"use client";

import React, { useEffect, useState, useCallback } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { X, Save, Loader2 } from "lucide-react";
import { SubscriptionService } from "@/lib/subcription"; // Hubi in jidkani sax yahay
import { SetupService } from "@/lib/setup"; // Hubi in jidkani sax yahay

// Interfaces
interface PlanDto {
  id: string;
  name: string;
}

interface AgencyDto {
  id: string;
  name: string;
}

export interface SubscrptionFormData {
  agencyId: string;
  planId: string;
  status: number;
  startDate: string;
  endDate: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: SubscrptionFormData;
  onClose: () => void;
  onSubmit: (data: SubscrptionFormData) => void;
}

const emptyForm: SubscrptionFormData = {
  agencyId: "",
  planId: "",
  status: 1, // Default active
  startDate: "",
  endDate: "",
};

export default function AgencySubscriptionFormModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<SubscrptionFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SubscrptionFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  
  // Xogta laga soo xidhay API-ga
  const [plans, setPlans] = useState<PlanDto[]>([]);
  const [agencies, setAgencies] = useState<AgencyDto[]>([]);

  // Soo xigashada Agency iyo Plans
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const [planRes, agencyRes] = await Promise.all([
          SubscriptionService.getPlans(),
          SetupService.getAgencies() // Hubi in function-kani jiro
        ]);
        
        const planItems = planRes.data?.data?.data || planRes.data?.data || [];
        setPlans(Array.isArray(planItems) ? planItems : []);

        const agencyItems = agencyRes.data?.data?.data || agencyRes.data?.data || [];
        setAgencies(Array.isArray(agencyItems) ? agencyItems : []);
        
      } catch (err) {
        console.error("Failed to load modal data", err);
      } finally {
        setFetching(false);
      }
    };

    if (open) {
      fetchData();
      if (mode === "edit" && initialData) {
        setForm({ ...initialData });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [open, mode, initialData]);

  const update = (k: keyof SubscrptionFormData, v: any) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<Record<keyof SubscrptionFormData, string>> = {};
    if (!form.agencyId) e.agencyId = "Please select an agency";
    if (!form.planId) e.planId = "Please select a plan";
    if (!form.startDate) e.startDate = "Start date is required";
    if (!form.endDate) e.endDate = "End date is required";

    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-none p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100 dark:border-gray-800 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {mode === "add" ? "Create Subscription" : "Edit Subscription"}
          </h3>
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {fetching ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Loader2 className="animate-spin mb-2" />
              <p className="text-sm">Loading plans and agencies...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Agency Select */}
              <Field label="Select Agency" required error={errors.agencyId}>
                <Select value={form.agencyId} onChange={(e) => update("agencyId", e.target.value)}>
                  <option value="">-- Choose Agency --</option>
                  {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </Select>
              </Field>

              {/* Plan Select */}
              <Field label="Select Plan" required error={errors.planId}>
                <Select value={form.planId} onChange={(e) => update("planId", e.target.value)}>
                  <option value="">-- Choose Plan --</option>
                  {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
              </Field>

              <Field label="Start Date" required error={errors.startDate}>
                <Input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
              </Field>

              <Field label="End Date" required error={errors.endDate}>
                <Input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
              </Field>

              <Field label="Status">
                <Select value={form.status.toString()} onChange={(e) => update("status", parseInt(e.target.value))}>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Select>
              </Field>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end items-center gap-3 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading || fetching}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {mode === "add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-gray-200"
    >
      {children}
    </select>
  );
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-[11px] font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}