"use client";

import React, { useEffect, useState, useRef } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { BlogItem, BlogService } from "@/lib/blog"; 
import toast from "react-hot-toast";

export interface BlogFormData {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
  isPublished: boolean;
  isFeatured: boolean;
  imageUrl: File | string | null;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: BlogItem;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => Promise<void>;
}

const emptyForm: BlogFormData = {
  title: "",
  content: "",
  categoryId: "",
  isPublished: true,
  isFeatured: false,
  imageUrl: null,
};

export default function BlogModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<BlogFormData>(emptyForm);
  // FIX 1: Ensure categories is initialized as an empty array to prevent .map() crashes
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof BlogFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FETCH CATEGORIES FROM API
  useEffect(() => {
    const fetchCats = async () => {
      try {
        setCatLoading(true);
        const res = await BlogService.getAllCategory(1, 100); 
        // FIX 2: Check deep structure of your response
        if (res.data?.success) {
          const items = res.data?.data?.items || [];
          setCategories(items);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setCatLoading(false);
      }
    };

    if (open) {
      fetchCats();
      
      if (mode === "edit" && initialData) {
        setForm({
          id: initialData.id,
          title: initialData.title || "",
          content: initialData.content || "",
          categoryId: initialData.categoryId || "",
          isPublished: initialData.isPublished,
          isFeatured: initialData.isFeatured,
          imageUrl: initialData.imageUrl || null,
        });
        setPreviewUrl(initialData.imageUrl || null);
      } else {
        setForm(emptyForm);
        setPreviewUrl(null);
      }
      setErrors({});
    }
  }, [mode, initialData, open]);

  const update = (key: keyof BlogFormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      update("imageUrl", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Article title is required";
    if (!form.content.trim()) e.content = "Content is required";
    if (!form.categoryId) e.categoryId = "Please select a category";
    // Only require image on "add" mode
    if (mode === "add" && !form.imageUrl) e.imageUrl = "Cover image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    try {
      await onSubmit(form);
      // Clean up preview URL to prevent memory leaks
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      onClose();
    } catch (err) {
      toast.error("Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-black text-[#090044]">
              {mode === "add" ? "Draft New Article" : "Edit Article"}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Blog Management</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto space-y-8">
          
          {/* Cover Image */}
          <div className="group relative w-full h-64 bg-gray-100 rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:border-[#00bf63]/50">
            {previewUrl ? (
              <img src={previewUrl} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center cursor-pointer">
                <span className="text-sm font-bold text-gray-400 uppercase">Upload Cover Photo</span>
              </div>
            )}
            <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
               <span className="bg-white px-4 py-2 rounded-lg text-xs font-bold">Change Image</span>
            </div>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          {errors.imageUrl && <p className="text-[10px] text-red-600 mt-[-20px] font-bold">{errors.imageUrl}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Blog Title" required error={errors.title}>
              <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Headline..." />
            </Field>

            <Field label="Category" required error={errors.categoryId}>
              <select
                disabled={catLoading}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#090044] focus:ring-2 focus:ring-[#00bf63] outline-none appearance-none disabled:opacity-50"
                value={form.categoryId}
                onChange={(e) => update("categoryId", e.target.value)}
              >
                <option value="">{catLoading ? "Loading Categories..." : "Select Category"}</option>
                {/* FIX 3: Using optional chaining to be safe */}
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="flex gap-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="w-5 h-5 accent-[#00bf63]" />
              <span className="text-xs font-bold text-[#090044] uppercase">Published</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="w-5 h-5 accent-[#00bf63]" />
              <span className="text-xs font-bold text-[#090044] uppercase">Featured</span>
            </label>
          </div>

          <Field label="Content" required error={errors.content}>
            <textarea
              className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm focus:ring-2 focus:ring-[#00bf63] min-h-[200px] outline-none"
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              placeholder="Write your article content here..."
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-gray-400 uppercase">Discard</button>
          <button
            onClick={submit}
            disabled={loading || catLoading}
            className="px-8 py-2.5 bg-[#00bf63] text-white text-xs font-black rounded-xl hover:bg-[#090044] transition-all uppercase tracking-widest disabled:bg-gray-200"
          >
            {loading ? "Saving..." : "Save Article"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean; }) {
  return (
    <div className="w-full">
      <Label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">{label} {required && "*"}</Label>
      {children}
      {error && <p className="text-[10px] text-red-600 mt-2 font-bold">{error}</p>}
    </div>
  );
}