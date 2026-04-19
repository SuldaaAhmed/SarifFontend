"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import { X, Save, Search, Check } from "lucide-react";
import { UsersService } from "@/lib/users";
import { SetupService } from "@/lib/setup";

interface RoleDto {
  id: string;
  name: string;
  isActive: boolean;
}

interface PermissionDto {
  id: number;
  name: string;
  keyName: string; 
  isActive: boolean;
}

export interface RolePermissionFormData {
  roleId: string;
  permissionIds: number[];
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: RolePermissionFormData;
  onClose: () => void;
  onSubmit: (data: RolePermissionFormData) => void;
}

const emptyForm: RolePermissionFormData = {
  roleId: "",
  permissionIds: [],
};

export default function RolePermissionFormModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<RolePermissionFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RolePermissionFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [searchPermission, setSearchPermission] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const [roleRes, permRes] = await Promise.all([
          UsersService.getRoles(),
          SetupService.getPermissions() 
        ]);
        
        // Roles: Using the logic from your original working version
        const roleItems = roleRes.data?.data?.data || roleRes.data?.data || roleRes.data || [];
        setRoles(Array.isArray(roleItems) ? roleItems : []);

        // Permissions: Using the nested logic from your second payload
        const permItems = permRes.data?.data?.data || permRes.data?.data || [];
        setPermissions(Array.isArray(permItems) ? permItems : []);
        
      } catch (err) {
        console.error("Failed to load modal data", err);
      } finally {
        setFetching(false);
      }
    };

    if (open) {
      fetchData();
      setForm(mode === "edit" && initialData ? { ...initialData } : emptyForm);
      setErrors({});
    }
  }, [open, mode, initialData]);

  const togglePermission = (id: number) => {
    setForm(prev => {
      const isSelected = prev.permissionIds.includes(id);
      return {
        ...prev,
        permissionIds: isSelected 
          ? prev.permissionIds.filter(pId => pId !== id) 
          : [...prev.permissionIds, id]
      };
    });
  };

  const filteredPermissions = permissions.filter(p => 
    p.name.toLowerCase().includes(searchPermission.toLowerCase()) ||
    p.keyName.toLowerCase().includes(searchPermission.toLowerCase())
  );

  const submit = async () => {
    const e: any = {};
    if (!form.roleId) e.roleId = "Role is required";
    if (form.permissionIds.length === 0) e.permissionIds = "Select at least one permission";
    
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

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
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {mode === "add" ? "Assign Role Permissions" : "Edit Role Permissions"}
            </h3>
            <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Access Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Role Selection */}
          <Field label="Target Role" required error={errors.roleId}>
            <div className="relative">
              <select
                disabled={fetching || mode === "edit"}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm font-semibold text-[#405189] focus:ring-2 focus:ring-[#405189]/20 outline-none appearance-none transition-all disabled:opacity-60"
                value={form.roleId}
                onChange={(e) => setForm({ ...form, roleId: e.target.value })}
              >
                <option value="">{fetching ? "Loading Roles..." : "Choose a Role"}</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </Field>

          {/* Permission Multi-Select */}
          <Field 
            label={`Select Permissions (${form.permissionIds.length} selected)`} 
            required 
            error={errors.permissionIds as any}
          >
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <Search size={14} className="text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search by name or key..."
                  className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-gray-400 dark:text-gray-200"
                  value={searchPermission}
                  onChange={(e) => setSearchPermission(e.target.value)}
                />
              </div>

              <div className="max-h-[220px] overflow-y-auto p-2 grid grid-cols-1 gap-1 custom-scrollbar">
                {fetching ? (
                  <div className="p-8 text-center text-gray-400 text-sm">Loading permissions...</div>
                ) : filteredPermissions.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm italic">No permissions found</div>
                ) : (
                  filteredPermissions.map((perm) => {
                    const active = form.permissionIds.includes(perm.id);
                    return (
                      <div 
                        key={perm.id}
                        onClick={() => togglePermission(perm.id)}
                        className={`
                          group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all
                          ${active 
                            ? "bg-[#405189]/10 border border-[#405189]/20" 
                            : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"}
                        `}
                      >
                        <div className="flex flex-col">
                          <span className={`text-[13px] font-bold ${active ? "text-[#405189]" : "text-gray-700 dark:text-gray-300"}`}>
                            {perm.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{perm.keyName}</span>
                        </div>
                        <div className={`
                          w-5 h-5 rounded flex items-center justify-center border transition-all
                          ${active ? "bg-[#405189] border-[#405189]" : "border-gray-300 dark:border-gray-600"}
                        `}>
                          {active && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end items-center gap-3 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-[#405189] hover:bg-[#364473] text-white rounded-lg text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {mode === "add" ? "Save Selection" : "Update Selection"}
          </button>
        </div>
      </div>
    </div>
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