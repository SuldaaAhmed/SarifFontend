"use client";

import React, { useEffect, useState, useCallback } from "react";
import SubscriptionFormModal, { SubscrptionFormData } from "./SubscriptionFormModal";
import ConfirmDeleteModal from "../ui/Model/ConfirmDeleteModal";
import { SubscriptionService } from "@/lib/subcription";
import toast from "react-hot-toast";
import { usePermission } from "@/context/PermissionContext";
import { Search, Loader2, ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

// Interface-ka saxda ah ee API Response-kaaga
interface SubscriptionRecord {
  id: string; // Tani waa Primary Key-ga dhabta ah (haddii uu JSON-ka ku jiro)
  agencyId: string;
  agencyName: string;
  planId: string;
  planName: string;
  status: number;
  startDate: string;
  endDate: string;
  userName: string;
}

export default function SubscriptionTable() {
  const { hasPermission } = usePermission();
  
  const [data, setData] = useState<SubscriptionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<SubscriptionRecord | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // --- GET Data ---
  const loadData = useCallback(async (page: number, searchQuery: string) => {
    setLoading(true);
    try {
      const res = await SubscriptionService.getSubscriptions(page, itemsPerPage);
      // Saxidda wadada xogta: res.data.data.data
      const apiResponse = res.data?.data?.data || [];
      
      let finalData = apiResponse;
      if (searchQuery) {
        finalData = finalData.filter((m: SubscriptionRecord) => 
          m.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.planName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setData(finalData);
      setTotalItems(res.data?.data?.totalRecords || 0);
    } catch {
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(currentPage, search);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentPage, search, loadData]);

  // --- CRUD Actions ---
  const handleFormSubmit = async (formData: SubscrptionFormData) => {
    try {
      if (mode === "add") {
        await SubscriptionService.createSubscription(formData);
        toast.success("Subscription created");
      } else {
        // Halkan waxaan u baahanahay ID-ga gaarka ah ee xariiqdaas
        await SubscriptionService.updateSubscription(selectedItem!.id, formData);
        toast.success("Subscription updated");
      }
      setOpenModal(false);
      loadData(currentPage, search);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    setDeleting(true);
    try {
      // SAXID: Waxaan u gudbinaynaa ID-ga gaarka ah ee subscription-ka (Primary Key)
      await SubscriptionService.deleteSubscription(selectedItem.id);
      toast.success("Subscription removed");
      setOpenDelete(false);
      loadData(currentPage, search);
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-[#f3f3f9] dark:bg-gray-900 min-h-screen p-4 sm:p-6 font-sans text-[#495057]">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold dark:text-gray-200 uppercase tracking-wide">Agency Subscriptions</h2>
          <div className="text-[13px] font-medium">
            Subscription <span className="text-gray-400 mx-1">&gt;</span> <span className="text-gray-400">List</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() => { setMode("add"); setSelectedItem(null); setOpenModal(true); }}
              className="bg-[#0ab39c] hover:bg-[#099885] text-white px-4 py-2 rounded text-[13px] flex items-center gap-1 transition-all"
            >
              <span className="text-lg">+</span> Add Subscription
            </button>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search agency or plan..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded text-[13px] focus:outline-none focus:border-[#405189] dark:bg-gray-900 dark:text-white"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto relative min-h-[300px]">
            {loading && (
               <div className="absolute inset-0 bg-white/40 dark:bg-gray-800/40 z-10 flex items-center justify-center">
                 <Loader2 className="animate-spin text-[#405189]" size={30} />
               </div>
            )}

            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f3f6f9] dark:bg-gray-700/50 text-[#878a99] text-[13px] font-bold uppercase border-y border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="p-3">Agency Name</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Duration (Dates)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {data.length === 0 && !loading ? (
                  <tr><td colSpan={5} className="p-6 text-center text-gray-400 italic text-sm">No records found</td></tr>
                ) : (
                  data.map((item, idx) => (
                    <tr key={idx} className="text-[13px] dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#405189] dark:text-blue-400">{item.agencyName}</span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <User size={10}/> {item.userName || "No User"}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#40518915] text-[#405189] px-2 py-0.5 rounded text-[11px] font-bold">
                          {item.planName}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        <div className="flex flex-col gap-0.5 text-[11px]">
                          <span className="flex items-center gap-1"><Calendar size={12} className="text-green-500"/> {new Date(item.startDate).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} className="text-red-500"/> {new Date(item.endDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {item.status === 1 ? (
                          <span className="bg-[#0ab39c20] text-[#0ab39c] px-2 py-1 rounded text-[10px] font-bold uppercase">Active</span>
                        ) : (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Expired</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => { setMode("edit"); setSelectedItem(item); setOpenModal(true); }} 
                            className="bg-[#299cdb] text-white px-3 py-1 rounded text-[11px] shadow-sm hover:brightness-110"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => { setSelectedItem(item); setOpenDelete(true); }} 
                            className="bg-[#f06548] text-white px-3 py-1 rounded text-[11px] shadow-sm hover:brightness-110"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span className="text-[13px] text-[#878a99]">
              Showing <span className="font-semibold">{startIndex}</span> to <span className="font-semibold">{endIndex}</span> of <span className="font-semibold">{totalItems}</span> Results
            </span>
            <div className="flex items-center gap-1">
              <button 
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1.5 border border-gray-200 dark:border-gray-700 rounded disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded text-[13px] transition-all ${
                    currentPage === page 
                      ? "bg-[#405189] text-white shadow-md font-bold" 
                      : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                disabled={currentPage >= totalPages || loading}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1.5 border border-gray-200 dark:border-gray-700 rounded disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionFormModal 
        open={openModal} 
        mode={mode} 
        initialData={selectedItem ? {
          agencyId: selectedItem.agencyId,
          planId: selectedItem.planId,
          status: selectedItem.status,
          startDate: selectedItem.startDate.split('T')[0],
          endDate: selectedItem.endDate.split('T')[0]
        } : undefined} 
        onClose={() => setOpenModal(false)} 
        onSubmit={handleFormSubmit} 
      />

      <ConfirmDeleteModal 
        open={openDelete} 
        loading={deleting} 
        onClose={() => setOpenDelete(false)} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
}