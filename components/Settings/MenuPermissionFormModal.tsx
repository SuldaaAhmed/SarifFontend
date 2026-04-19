"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import { X, Save, Search, Check, Loader2 } from "lucide-react";
import { SetupService } from "@/lib/setup";

interface MenuDto {
  id: number | string;
  title: string;
}

interface PermissionDto {
  id: number;
  name: string;
  keyName: string; 
}

export interface RolePermissionFormData {
  roleId: string; // Used for single menu ID or first selected
  menuIds: (string | number)[]; // Supporting multiple menus
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
  menuIds: [],
  permissionIds: [],
};

export default function MenuPermissionFormModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<RolePermissionFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RolePermissionFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  
  const [menus, setMenus] = useState<MenuDto[]>([]);
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [searchMenu, setSearchMenu] = useState("");
  const [searchPermission, setSearchPermission] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const [menuRes, permRes] = await Promise.all([
          SetupService.getMenusSingle(),
          SetupService.getPermissions() 
        ]);
        
        const menuItems = menuRes.data?.data || [];
        setMenus(Array.isArray(menuItems) ? menuItems : []);

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
      // Logic to handle initial data for edit mode
      if (mode === "edit" && initialData) {
        setForm({
          ...initialData,
          menuIds: initialData.roleId ? [initialData.roleId] : []
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
      setSearchMenu("");
      setSearchPermission("");
    }
  }, [open, mode, initialData]);

  const toggleItem = (id: string | number, field: "menuIds" | "permissionIds") => {
    setForm(prev => {
      const currentList = prev[field] as any[];
      const isSelected = currentList.includes(id);
      return {
        ...prev,
        [field]: isSelected 
          ? currentList.filter(item => item !== id) 
          : [...currentList, id]
      };
    });
  };

  const filteredMenus = menus.filter(m => 
    m.title.toLowerCase().includes(searchMenu.toLowerCase())
  );

  const filteredPermissions = permissions.filter(p => 
    p.name.toLowerCase().includes(searchPermission.toLowerCase()) ||
    p.keyName.toLowerCase().includes(searchPermission.toLowerCase())
  );

  const submit = async () => {
    const e: any = {};
    if (form.menuIds.length === 0) e.roleId = "Select at least one menu";
    if (form.permissionIds.length === 0) e.permissionIds = "Select at least one permission";
    
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      // Map back to the expected roleId (usually the first selected in multi-scenarios)
      await onSubmit({ ...form, roleId: form.menuIds[0].toString() });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-none p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {mode === "add" ? "Assign Menu Permissions" : "Edit Menu Permissions"}
            </h3>
            <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Configuration</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Menu Multi-Select */}
          <Field label={`1. Select Menus (${form.menuIds.length})`} required error={errors.roleId}>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
              <div className="bg-gray-50 dark:bg-gray-800/50 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <Search size={14} className="text-gray-400" />
                <input 
                  type="text"
                  placeholder="Filter menus..."
                  className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-gray-400 dark:text-gray-200"
                  value={searchMenu}
                  onChange={(e) => setSearchMenu(e.target.value)}
                />
              </div>
              <div className="h-[250px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {fetching ? <LoadingState /> : filteredMenus.map((menu) => {
                  const active = form.menuIds.includes(menu.id);
                  return (
                    <SelectionItem 
                      key={menu.id}
                      title={menu.title}
                      active={active}
                      onClick={() => toggleItem(menu.id, "menuIds")}
                    />
                  );
                })}
              </div>
            </div>
          </Field>

          {/* Permission Multi-Select */}
          <Field label={`2. Select Permissions (${form.permissionIds.length})`} required error={errors.permissionIds as any}>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
              <div className="bg-gray-50 dark:bg-gray-800/50 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <Search size={14} className="text-gray-400" />
                <input 
                  type="text"
                  placeholder="Filter permissions..."
                  className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-gray-400 dark:text-gray-200"
                  value={searchPermission}
                  onChange={(e) => setSearchPermission(e.target.value)}
                />
              </div>
              <div className="h-[250px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {fetching ? <LoadingState /> : filteredPermissions.map((perm) => {
                  const active = form.permissionIds.includes(perm.id);
                  return (
                    <SelectionItem 
                      key={perm.id}
                      title={perm.name}
                      subtitle={perm.keyName}
                      active={active}
                      onClick={() => toggleItem(perm.id, "permissionIds")}
                    />
                  );
                })}
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
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {mode === "add" ? "Save Assignments" : "Update Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function SelectionItem({ title, subtitle, active, onClick }: { title: string; subtitle?: string; active: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all border
        ${active ? "bg-[#405189]/10 border-[#405189]/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border-transparent"}
      `}
    >
      <div className="flex flex-col overflow-hidden">
        <span className={`text-[12px] font-bold truncate ${active ? "text-[#405189]" : "text-gray-700 dark:text-gray-300"}`}>
          {title}
        </span>
        {subtitle && <span className="text-[9px] text-gray-400 font-mono uppercase truncate">{subtitle}</span>}
      </div>
      <div className={`shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-all
        ${active ? "bg-[#405189] border-[#405189]" : "border-gray-300 dark:border-gray-600"}
      `}>
        {active && <Check size={10} className="text-white" strokeWidth={4} />}
      </div>
    </div>
  );
}

function LoadingState() {
  return <div className="p-8 text-center text-gray-400 text-sm italic">Loading data...</div>;
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