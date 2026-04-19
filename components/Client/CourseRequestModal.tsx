"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CoursesService } from "@/lib/courses";

export interface CourseRequestFormData {
  id?: string;
  courseId: string;
  courseTypeId: string;
  discountAmount: number;
  paidAmount: number;
  coursePrice: number; // For calculation/display
  type: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const emptyForm: CourseRequestFormData = {
  courseId: "",
  courseTypeId: "",
  discountAmount: 0,
  paidAmount: 0,
  coursePrice: 0,
  type: "Physical",
};

export default function CourseRequestModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CourseRequestFormData>(emptyForm);
  const [courses, setCourses] = useState<any[]>([]);
  const [courseTypes, setCourseTypes] = useState<any[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseRequestFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  // Load available courses for the dropdown
  useEffect(() => {
    if (open) {
      loadCourses();
      if (mode === "edit" && initialData) {
        setForm({
          ...initialData,
          coursePrice: initialData.coursePrice || 0
        });
        loadCourseTypes(initialData.courseId);
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [mode, initialData, open]);

  async function loadCourses() {
    try {
      const res = await CoursesService.getAllCoursesSummary(1, 100);
      setCourses(res.data.data.items || []);
    } catch (err) {
      console.error("Failed to load courses");
    }
  }

  async function loadCourseTypes(courseId: string) {
    try {
      const res = await CoursesService.getCourseTypes(courseId);
      setCourseTypes(res.data.data || []);
    } catch (err) {
      console.error("Failed to load course types");
    }
  }

  const handleCourseChange = (courseId: string) => {
    const selected = courses.find((c) => c.id === courseId);
    setForm((prev) => ({ 
      ...prev, 
      courseId, 
      coursePrice: selected?.price || 0,
      paidAmount: 0 // Reset payments on course change
    }));
    loadCourseTypes(courseId);
  };

  const update = (key: keyof CourseRequestFormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.courseId) e.courseId = "Please select a course";
    if (!form.courseTypeId) e.courseTypeId = "Please select a course type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    try {
      // Backend expects numbers for decimal fields
      const payload = {
        ...form,
        discountAmount: Number(form.discountAmount),
        paidAmount: Number(form.paidAmount),
        coursePrice: Number(form.coursePrice),
      };
      await onSubmit(payload);
      onClose();
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  const remainingBalance = form.coursePrice - form.discountAmount - form.paidAmount;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-800 bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {mode === "add" ? "New Course Request" : "Update Enrollment"}
          </h3>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Select Course" required error={errors.courseId}>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                value={form.courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
              >
                <option value="">Choose a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title} (${c.price})</option>
                ))}
              </select>
            </Field>

            <Field label="Course Type" required error={errors.courseTypeId}>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                value={form.courseTypeId}
                onChange={(e) => update("courseTypeId", e.target.value)}
              >
                <option value="">Choose a type...</option>
                {courseTypes.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Original Price">
              <Input value={form.coursePrice} disabled className="bg-gray-100" />
            </Field>

            <Field label="Request Type">
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
              >
                <option value="Physical">Physical</option>
                <option value="Online">Online</option>
              </select>
            </Field>

            <Field label="Discount Amount">
              <Input
                type="number"
                value={form.discountAmount}
                onChange={(e) => update("discountAmount", e.target.value)}
                placeholder="0.00"
              />
            </Field>

            <Field label="Amount Paid">
              <Input
                type="number"
                value={form.paidAmount}
                onChange={(e) => update("paidAmount", e.target.value)}
                placeholder="0.00"
              />
            </Field>
          </div>

          {/* Balance Summary Card */}
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Remaining Balance</p>
              <h4 className={`text-2xl font-black ${remainingBalance > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                ${remainingBalance.toFixed(2)}
              </h4>
            </div>
            <div className="text-right text-[10px] text-indigo-400 font-medium">
              Price: ${form.coursePrice} <br />
              - Disc: ${form.discountAmount} <br />
              - Paid: ${form.paidAmount}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3 bg-gray-50/50">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-8 py-2.5 bg-[#4F46E5] text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : mode === "add" ? "Create Request" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean; }) {
  return (
    <div className="w-full">
      <Label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">{label} {required && <span className="text-red-500">*</span>}</Label>
      {children}
      {error && <p className="text-[10px] text-red-600 mt-1 font-medium">{error}</p>}
    </div>
  );
}