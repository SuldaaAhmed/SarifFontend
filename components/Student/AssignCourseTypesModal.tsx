"use client";

import React, { useEffect, useState } from "react";
import { StudentService } from "@/lib/students";
import toast from "react-hot-toast";
import { ShieldCheck, Loader2, Check, AlertCircle, X, ChevronDown } from "lucide-react";

interface StudentCourse {
  courseId: string;
  courseName: string;
}

interface CourseTypeDto {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  studentId: string;
  courses: StudentCourse[]; // Changed from single courseId
  studentName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignCourseTypesModal({ 
  open, studentId, courses, studentName, onClose, onSuccess 
}: Props) {
  // NEW: Track which course is currently selected in the dropdown
  const [activeCourseId, setActiveCourseId] = useState<string>("");
  const [types, setTypes] = useState<CourseTypeDto[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Set initial course when modal opens
  useEffect(() => {
    if (open && courses.length > 0) {
      setActiveCourseId(courses[0].courseId);
    }
  }, [open, courses]);

  // Fetch types whenever the activeCourseId changes
  useEffect(() => {
    if (open && activeCourseId) {
      fetchTypes(activeCourseId);
    }
  }, [open, activeCourseId]);

  const fetchTypes = async (cId: string) => {
    setFetching(true);
    try {
      const res = await StudentService.getCourseTypesByCourseId(cId);
      if (res.data.success) {
        setTypes(res.data.data || []);
      }
    } catch (err) {
      toast.error("Failed to load specialization types");
    } finally {
      setFetching(false);
    }
  };

  const toggleType = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (selectedIds.length === 0) return toast.error("Select at least one type");
    setLoading(true);
    try {
      const res = await StudentService.assignCourseTypes({
        studentId: studentId,
        courseTypeIds: selectedIds
      });

      if (res.data.success) {
        toast.success("Assignment successful");
        onSuccess();
        onClose();
        setSelectedIds([]);
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b bg-gray-50/50 relative text-center">
          <button onClick={onClose} className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm shadow-amber-100">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Configure Study Path</h3>
          <p className="text-sm text-gray-500 mt-1">Student: <span className="font-bold text-indigo-600">{studentName}</span></p>
        </div>

        {/* Course Selection Dropdown (Only shows if student has > 1 course) */}
        <div className="px-6 pt-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Select Target Course</label>
          <div className="relative">
            <select 
              value={activeCourseId}
              onChange={(e) => {
                setActiveCourseId(e.target.value);
                setSelectedIds([]); // Clear selections when switching courses
              }}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl text-sm font-semibold appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              {courses.map(c => (
                <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
              ))}
              {courses.length === 0 && <option value="">No courses available</option>}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Types List */}
        <div className="p-6">
          {fetching ? (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
              <p className="text-xs font-medium text-gray-400 mt-3">Fetching available types...</p>
            </div>
          ) : types.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
               <AlertCircle className="mx-auto text-gray-300 mb-2" size={24} />
               <p className="text-gray-400 text-xs italic">No specializations found for this specific course.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
              {types.map((type) => (
                <label 
                  key={type.id} 
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedIds.includes(type.id) 
                    ? "border-indigo-500 bg-indigo-50/50 shadow-sm" 
                    : "border-gray-50 hover:border-gray-200 bg-gray-50/30"
                  }`}
                >
                  <span className="text-sm font-bold text-gray-700">{type.name}</span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedIds.includes(type.id)}
                    onChange={() => toggleType(type.id)}
                  />
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                    selectedIds.includes(type.id) 
                    ? "bg-indigo-600 border-indigo-600" 
                    : "border-gray-200 bg-white"
                  }`}>
                    {selectedIds.includes(type.id) && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/80 border-t flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !activeCourseId || selectedIds.length === 0}
            className="flex-1 px-4 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-40 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Confirm Selection"}
          </button>
        </div>
      </div>
    </div>
  );
}