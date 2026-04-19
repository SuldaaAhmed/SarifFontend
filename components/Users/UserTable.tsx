"use client";

import React, { useEffect, useState, useCallback } from "react";
import UserFormModal, { UserFormData } from "./UserFormModal";
import ConfirmDeleteModal from "../ui/Model/ConfirmDeleteModal";
import { UsersService } from "@/lib/users";
import toast from "react-hot-toast";
import { usePermission } from "@/context/PermissionContext";
import { Search, Loader2 } from "lucide-react"; // Waxaan ku daray Loader2 si loo muujiyo loading-ka

interface UserDto {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phone: string | null;
  role: string;
  gender: string;
  address: string;
  isactive: boolean;
}

export default function UserTable() {
  const { hasPermission } = usePermission();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Bilowga Loading ka dhig true

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); 
  const itemsPerPage = 10;

  const loadUsers = useCallback(async (page: number, searchQuery: string) => {
    setLoading(true); // Bilow loading markii xog cusub la dalbado
    try {
      const res = await UsersService.getAll(page, itemsPerPage, searchQuery);
      const apiResponse = res.data?.data;
      if (apiResponse) {
        setUsers(apiResponse.data || []);
        setTotalItems(apiResponse.totalRecords || 0);
      }
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false); // Dami loading-ka markay xogtu timaado
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers(currentPage, search);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentPage, search, loadUsers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      if (mode === "add") {
        await UsersService.create(data);
        toast.success("User created successfully");
      } else {
        if (!selectedUser) return;
        await UsersService.update(selectedUser.id, data);
        toast.success("Profile updated");
      }
      setOpenModal(false);
      loadUsers(currentPage, search);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setDeleting(true);
    try {
      await UsersService.delete(selectedUser.id);
      toast.success("User removed");
      setOpenDelete(false);
      loadUsers(currentPage, search);
    } catch {
      toast.error("Could not delete user");
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const canAdd = hasPermission("CREATE.USER");
  const canEdit = hasPermission("EDIT.USER");
  const canDelete = hasPermission("DELETE.USER");

  return (
    <div className="bg-[#f3f3f9] dark:bg-gray-900 min-h-screen p-4 sm:p-6 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-[#495057] dark:text-gray-200 uppercase tracking-wide">List Users</h2>
          <div className="text-[13px] text-[#495057] font-medium">
            Tables <span className="text-gray-400 mx-1">&gt;</span> <span className="text-gray-400">List Users</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700 p-4">
            <h3 className="text-[16px] font-semibold text-[#495057] dark:text-gray-300">Add, Edit & Remove</h3>
          </div>

          <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              {canAdd && (
                <button
                  onClick={() => { setMode("add"); setSelectedUser(null); setOpenModal(true); }}
                  className="bg-[#0ab39c] hover:bg-[#099885] text-white px-4 py-2 rounded text-[13px] flex items-center gap-1 transition-all"
                >
                  <span className="text-lg">+</span> Add User
                </button>
              )}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded text-[13px] focus:outline-none focus:border-[#405189] dark:bg-gray-900"
                value={search}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="overflow-x-auto relative">
            {/* Loading Overlay: Waxay soo baxdaa markii xogtu jirto laakiin la cusboonaysiinayo */}
            {loading && users.length > 0 && (
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 z-10 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#405189]" size={30} />
              </div>
            )}

            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f3f6f9] dark:bg-gray-700/50 text-[#878a99] text-[13px] font-bold uppercase border-y border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="p-3 w-10 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loading && users.length === 0 ? (
                  <SkeletonRows />
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500">Xog lama helin</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="text-[13px] text-[#212529] dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                      <td className="p-3 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
                      <td className="p-3 font-medium">{u.fullName}</td>
                      <td className="p-3 text-[#878a99]">{u.email}</td>
                      <td className="p-3">{u.phone || "N/A"}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-[2px] rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.isactive ? 'bg-[#0ab39c20] text-[#0ab39c]' : 'bg-[#f0654820] text-[#f06548]'
                        }`}>
                          {u.isactive ? 'ACTIVE' : 'BLOCK'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          {canEdit && (
                            <button onClick={() => { setMode("edit"); setSelectedUser(u); setOpenModal(true); }} className="bg-[#299cdb] text-white px-3 py-1 rounded text-[11px]">Edit</button>
                          )}
                          {canDelete && (
                            <button onClick={() => { setSelectedUser(u); setOpenDelete(true); }} className="bg-[#f06548] text-white px-3 py-1 rounded text-[11px]">Remove</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
            <span className="text-[13px] text-[#878a99]">
              Showing <span className="font-semibold">{startIndex}</span> to <span className="font-semibold">{endIndex}</span> of <span className="font-semibold">{totalItems}</span> Results
            </span>
            <div className="flex items-center gap-1">
              <button 
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-3 py-1.5 border border-gray-200 rounded text-[13px] disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded text-[13px] ${currentPage === page ? "bg-[#405189] text-white" : "border border-gray-200"}`}
                >
                  {page}
                </button>
              ))}
              <button 
                disabled={currentPage >= totalPages || loading}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-1.5 border border-gray-200 rounded text-[13px] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserFormModal 
        open={openModal} 
        mode={mode} 
        initialData={selectedUser ? {
          fullName: selectedUser.fullName,
          email: selectedUser.email,
          phone: selectedUser.phone ?? "", 
          gender: selectedUser.gender,
          password: "",
          confirmPassword: ""
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

function SkeletonRows() {
  return (
    <>
      {[1, 2, 3, 4, 5].map(i => (
        <tr key={i} className="animate-pulse">
          <td colSpan={6} className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </td>
        </tr>
      ))}
    </>
  );
}