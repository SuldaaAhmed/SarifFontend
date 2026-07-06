"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import { UsersService } from "@/lib/users";
import AssignUserRoleModal from "./AssignUserRoleModal";

interface UserWithRoleDto {
  id: string;
  phone: string | null;
  userName: string;
  gender: string;
  isactive: boolean;
  fullName: string;
  address: string;
  email: string;
  profilePictureUrl: string;
  role: string;
}

interface UsersPaginationDto {
  data: UserWithRoleDto[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export default function AssignUserRoleTable() {
  const [users, setUsers] = useState<UserWithRoleDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [openAssignModal, setOpenAssignModal] =
    useState(false);

  const pageSize = 10;

  const loadUsers = useCallback(async (page: number) => {
    setLoading(true);

    try {
      const response =
        await UsersService.getAllWithRoles(
          page,
          pageSize
        );

      /*
        Backend response:

        response.data.data.data = users list
        response.data.data.page
        response.data.data.pageSize
        response.data.data.totalRecords
        response.data.data.totalPages
      */

      const paginationData: UsersPaginationDto | undefined =
        response.data?.data;

      const userItems = paginationData?.data ?? [];

      setUsers(
        Array.isArray(userItems)
          ? userItems
          : []
      );

      setTotalRecords(
        paginationData?.totalRecords ?? 0
      );

      setTotalPages(
        paginationData?.totalPages ?? 0
      );
    } catch (error: any) {
      console.error(
        "Failed to load users with roles:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load users with roles"
      );

      setUsers([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage, loadUsers]);

  const filteredUsers = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) {
      return users;
    }

    return users.filter((user) => {
      const searchableValues = [
        user.fullName,
        user.userName,
        user.email,
        user.phone,
        user.gender,
        user.address,
        user.role,
      ];

      return searchableValues.some((value) =>
        value
          ?.toString()
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [users, search]);

  const startIndex =
    totalRecords === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endIndex = Math.min(
    currentPage * pageSize,
    totalRecords
  );

  const getInitials = (
    fullName?: string,
    userName?: string
  ) => {
    const name =
      fullName?.trim() ||
      userName?.trim() ||
      "U";

    const words = name
      .split(" ")
      .filter(Boolean);

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      words[0][0] + words[1][0]
    ).toUpperCase();
  };

  const handleRoleAssigned = async () => {
    await loadUsers(currentPage);

    toast.success(
      "Users list updated successfully"
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f3f9] p-4 font-sans text-[#495057] dark:bg-gray-900 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[15px] font-bold uppercase tracking-wide text-gray-700 dark:text-gray-200">
              User Role Assignments
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              View users and their assigned roles
            </p>
          </div>

          <div className="text-[13px] font-medium">
            Users
            <span className="mx-2 text-gray-400">
              &gt;
            </span>
            <span className="text-gray-400">
              Role Assignments
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Toolbar */}
          <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-100 p-4 dark:border-gray-700 md:flex-row">
            <button
              type="button"
              onClick={() =>
                setOpenAssignModal(true)
              }
              className="flex w-full items-center justify-center gap-2 rounded bg-[#0ab39c] px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#099885] md:w-auto"
            >
              <UserPlus size={16} />
              Assign Role
            </button>

            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search user, email or role..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded border border-gray-200 py-2 pl-10 pr-4 text-[13px] focus:border-[#405189] focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />

              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Table content */}
          <div className="relative min-h-[300px]">
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-gray-800/60">
                <div className="flex flex-col items-center gap-2">
                  <Loader2
                    className="animate-spin text-[#405189]"
                    size={30}
                  />

                  <span className="text-xs text-gray-400">
                    Loading users...
                  </span>
                </div>
              </div>
            )}

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-y border-gray-200 bg-[#f3f6f9] text-[12px] font-bold uppercase text-[#878a99] dark:border-gray-700 dark:bg-gray-700/50">
                  <tr>
                    <th className="p-3">
                      User
                    </th>

                    <th className="p-3">
                      Contact
                    </th>

                    <th className="p-3">
                      Gender
                    </th>

                    <th className="p-3">
                      Address
                    </th>

                    <th className="p-3">
                      Role
                    </th>

                    <th className="p-3 text-center">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {!loading &&
                  filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-sm italic text-gray-400"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="text-[13px] transition-colors hover:bg-gray-50/70 dark:text-gray-300 dark:hover:bg-gray-700/30"
                      >
                        {/* User */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            {user.profilePictureUrl ? (
                              <img
                                src={
                                  user.profilePictureUrl
                                }
                                alt={user.fullName}
                                className="h-9 w-9 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#405189]/10 text-xs font-bold text-[#405189]">
                                {getInitials(
                                  user.fullName,
                                  user.userName
                                )}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-gray-700 dark:text-gray-200">
                                {user.fullName ||
                                  "No name"}
                              </p>

                              <p className="truncate text-[11px] text-gray-400">
                                @{user.userName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="p-3">
                          <p className="text-gray-600 dark:text-gray-300">
                            {user.email ||
                              "No email"}
                          </p>

                          <p className="mt-0.5 text-[11px] text-gray-400">
                            {user.phone ||
                              "No phone"}
                          </p>
                        </td>

                        {/* Gender */}
                        <td className="p-3">
                          {user.gender || "N/A"}
                        </td>

                        {/* Address */}
                        <td className="p-3">
                          {user.address || "N/A"}
                        </td>

                        {/* Role */}
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1.5 rounded bg-[#299cdb]/10 px-2.5 py-1 text-[11px] font-bold text-[#299cdb]">
                            <ShieldCheck
                              size={13}
                            />

                            {user.role ||
                              "No Role"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="p-3 text-center">
                          {user.isactive ? (
                            <span className="inline-flex rounded bg-[#0ab39c]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#0ab39c]">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex rounded bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-red-500">
                              Inactive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="block divide-y divide-gray-100 dark:divide-gray-700 md:hidden">
              {!loading &&
              filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-sm italic text-gray-400">
                  No users found
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="space-y-3 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#405189]/10 text-xs font-bold text-[#405189]">
                        {getInitials(
                          user.fullName,
                          user.userName
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {user.fullName ||
                            "No name"}
                        </p>

                        <p className="truncate text-[11px] text-gray-400">
                          {user.email}
                        </p>
                      </div>

                      {user.isactive ? (
                        <span className="rounded bg-[#0ab39c]/10 px-2 py-1 text-[9px] font-bold uppercase text-[#0ab39c]">
                          Active
                        </span>
                      ) : (
                        <span className="rounded bg-red-500/10 px-2 py-1 text-[9px] font-bold uppercase text-red-500">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">
                          Username
                        </p>

                        <p className="font-medium dark:text-gray-300">
                          {user.userName}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase text-gray-400">
                          Phone
                        </p>

                        <p className="font-medium dark:text-gray-300">
                          {user.phone ||
                            "No phone"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase text-gray-400">
                          Gender
                        </p>

                        <p className="font-medium dark:text-gray-300">
                          {user.gender ||
                            "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase text-gray-400">
                          Address
                        </p>

                        <p className="font-medium dark:text-gray-300">
                          {user.address ||
                            "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded bg-[#299cdb]/10 px-2.5 py-1 text-[10px] font-bold text-[#299cdb]">
                        <ShieldCheck size={12} />
                        {user.role ||
                          "No Role"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex-row">
            <span className="text-[13px] text-[#878a99]">
              Showing{" "}
              <span className="font-semibold">
                {startIndex}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {totalRecords}
              </span>{" "}
              results
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={
                  currentPage === 1 ||
                  loading
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                className="rounded border border-gray-200 p-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  disabled={loading}
                  className={`rounded px-3 py-1.5 text-[13px] transition-all ${
                    currentPage === page
                      ? "bg-[#405189] font-bold text-white shadow-md"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  currentPage >=
                    totalPages ||
                  loading ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
                className="rounded border border-gray-200 p-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AssignUserRoleModal
        open={openAssignModal}
        onClose={() =>
          setOpenAssignModal(false)
        }
        onAssigned={handleRoleAssigned}
      />
    </div>
  );
}