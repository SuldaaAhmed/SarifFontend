"use client";

import React, { useEffect, useState, useRef } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export interface TeamMemberFormData {
  id?: string;
  title: string;
  description: string;
  status: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
  coverImage: File | string | null; // Changed to allow string (URL) or File
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: TeamMemberFormData) => Promise<void>;
}

const emptyForm: TeamMemberFormData = {
  title: "",
  description: "",
  status: "Pending",
  linkedin: "",
  facebook: "",
  website: "",
  coverImage: null,
};

export default function TeamMemberModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<TeamMemberFormData>(emptyForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // For showing the image
  const [errors, setErrors] = useState<Partial<Record<keyof TeamMemberFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setForm({
          ...initialData,
          // Use coverImageUrl from your API response if coverImage is null
          coverImage: initialData.coverImageUrl || null, 
        });
        setPreviewUrl(initialData.coverImageUrl || null);
      } else {
        setForm(emptyForm);
        setPreviewUrl(null);
      }
      setErrors({});
    }
  }, [mode, initialData, open]);

  const update = (key: keyof TeamMemberFormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      update("coverImage", file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview for new file
    }
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Name/Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (mode === "add" && !form.coverImage) e.coverImage = "Profile image is required";
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
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {mode === "add" ? "Add Team Member" : "Update Team Member"}
          </h3>
          <button onClick={onClose} className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* IMAGE PREVIEW SECTION */}
          <div className="mb-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
            {previewUrl ? (
              <div className="relative group">
                <img src={previewUrl} alt="Preview" className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-md" />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <span className="text-white text-xs font-medium">Change Photo</span>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 rounded-full bg-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <span className="text-gray-400 text-[10px] font-bold uppercase">No Image</span>
              </div>
            )}
            <p className="text-[10px] text-gray-400 mt-2 italic">Click image to upload new photo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Full Name" required error={errors.title}>
              <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Member Name" />
            </Field>

            <Field label="Status">
              <select
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>

            <Field label="LinkedIn URL">
              <Input value={form.linkedin || ""} onChange={(e) => update("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." />
            </Field>

            <Field label="Facebook URL">
              <Input value={form.facebook || ""} onChange={(e) => update("facebook", e.target.value)} placeholder="https://facebook.com/..." />
            </Field>

            <Field label="Portfolio/Website">
              <Input value={form.website || ""} onChange={(e) => update("website", e.target.value)} placeholder="https://yourwebsite.com" />
            </Field>

            <Field label="Upload New Image" error={errors.coverImage}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Description / Bio" required error={errors.description}>
              <textarea
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 min-h-[100px] outline-none"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Short biography..."
              />
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/50">
          <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-700 rounded-lg transition-colors">Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors shadow-lg"
          >
            {loading ? "Saving..." : mode === "add" ? "Create Member" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean; }) {
  return (
    <div className="w-full">
      <Label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}</Label>
      {children}
      {error && <p className="text-[10px] text-red-600 mt-1 font-medium">{error}</p>}
    </div>
  );
}