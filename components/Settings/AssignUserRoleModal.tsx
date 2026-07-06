"use client";

import React, { useEffect, useMemo, useState } from "react";
import Label from "@/components/form/Label";
import {
  X,
  Save,
  Search,
  Check,
  Loader2,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { UsersService } from "@/lib/users";

interface UserDto {
  id: string;
  fullName?: string;
  userName?: string;
  email?: string;
  phone?: string;
  role?: string;
  isactive?: boolean;
}

interface RoleDto {
  id: string;
  name: string;
  description?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAssigned?: () => void | Promise<void>;
}

interface AssignRoleFormData {
  userId: string;
  roleName: string;
}

const emptyForm: AssignRoleFormData = {
  userId: "",
  roleName: "",
};

/**
 * Supports different backend response formats:
 *
 * response.data
 * response.data.data
 * response.data.data.data
 */
function extractArray<T>(response: any): T[] {
  const possibleArrays = [
    response?.data?.data?.data,
    response?.data?.data,
    response?.data,
  ];

  const foundArray = possibleArrays.find((item) => Array.isArray(item));

  return foundArray ?? [];
}

export default function AssignUserRoleModal({
  open,
  onClose,
  onAssigned,
}: Props) {
  const [form, setForm] = useState<AssignRoleFormData>(emptyForm);

  const [users, setUsers] = useState<UserDto[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);

  const [searchUser, setSearchUser] = useState("");
  const [searchRole, setSearchRole] = useState("");

  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    userId?: string;
    roleName?: string;
    general?: string;
  }>({});

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setFetching(true);
      setErrors({});

      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          UsersService.getAll(1, 100, ""),
          UsersService.getRoles(),
        ]);

        const userItems = extractArray<UserDto>(usersResponse);
        const roleItems = extractArray<RoleDto>(rolesResponse);

        setUsers(userItems);

        setRoles(
          roleItems.filter(
            (role) =>
              role &&
              typeof role.name === "string" &&
              role.name.trim() !== ""
          )
        );
      } catch (error: any) {
        console.error("Failed to fetch users and roles:", error);

        setErrors({
          general:
            error?.response?.data?.message ||
            "Failed to load users and roles.",
        });
      } finally {
        setFetching(false);
      }
    };

    setForm(emptyForm);
    setSearchUser("");
    setSearchRole("");
    setUsers([]);
    setRoles([]);

    fetchData();
  }, [open]);

  const filteredUsers = useMemo(() => {
    const keyword = searchUser.trim().toLowerCase();

    if (!keyword) return users;

    return users.filter((user) => {
      const values = [
        user.fullName,
        user.userName,
        user.email,
        user.phone,
        user.role,
      ];

      return values.some((value) =>
        value?.toLowerCase().includes(keyword)
      );
    });
  }, [users, searchUser]);

  const filteredRoles = useMemo(() => {
    const keyword = searchRole.trim().toLowerCase();

    if (!keyword) return roles;

    return roles.filter((role) => {
      return (
        role.name.toLowerCase().includes(keyword) ||
        role.description?.toLowerCase().includes(keyword)
      );
    });
  }, [roles, searchRole]);

  const selectUser = (userId: string) => {
    setForm((previous) => ({
      ...previous,
      userId,
    }));

    setErrors((previous) => ({
      ...previous,
      userId: undefined,
      general: undefined,
    }));
  };

  const selectRole = (roleName: string) => {
    setForm((previous) => ({
      ...previous,
      roleName,
    }));

    setErrors((previous) => ({
      ...previous,
      roleName: undefined,
      general: undefined,
    }));
  };

  const submit = async () => {
    const validationErrors: {
      userId?: string;
      roleName?: string;
    } = {};

    if (!form.userId) {
      validationErrors.userId = "Please select a user.";
    }

    if (!form.roleName) {
      validationErrors.roleName = "Please select a role.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await UsersService.assignRole(
        form.userId,
        form.roleName
      );

      await onAssigned?.();

      onClose();
    } catch (error: any) {
      console.error("Failed to assign role:", error);

      const backendErrors = error?.response?.data?.errors;

      const backendErrorMessage = Array.isArray(backendErrors)
        ? backendErrors
            .map(
              (item: any) =>
                item?.description || item?.code
            )
            .filter(Boolean)
            .join(", ")
        : null;

      setErrors({
        general:
          backendErrorMessage ||
          error?.response?.data?.message ||
          "Could not assign the selected role.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Assign Role to User
            </h3>

            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              User role management
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* General error */}
        {errors.general && (
          <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {errors.general}
          </div>
        )}

        {/* Body */}
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* Users list */}
          <Field
            label="1. Select User"
            required
            error={errors.userId}
          >
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/50">
                <Search
                  size={14}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchUser}
                  onChange={(event) =>
                    setSearchUser(event.target.value)
                  }
                  className="w-full border-none bg-transparent text-[13px] outline-none placeholder:text-gray-400 dark:text-gray-200"
                />
              </div>

              <div className="custom-scrollbar h-[280px] space-y-1 overflow-y-auto p-2">
                {fetching ? (
                  <LoadingState />
                ) : filteredUsers.length === 0 ? (
                  <EmptyState message="No users found." />
                ) : (
                  filteredUsers.map((user) => {
                    const active =
                      form.userId === user.id;

                    const displayName =
                      user.fullName ||
                      user.userName ||
                      user.email ||
                      "Unnamed User";

                    const subtitle = [
                      user.email,
                      user.role &&
                      user.role !== "No Role"
                        ? `Current role: ${user.role}`
                        : "No assigned role",
                    ]
                      .filter(Boolean)
                      .join(" • ");

                    return (
                      <SelectionItem
                        key={user.id}
                        title={displayName}
                        subtitle={subtitle}
                        active={active}
                        icon={<UserRound size={15} />}
                        onClick={() =>
                          selectUser(user.id)
                        }
                      />
                    );
                  })
                )}
              </div>
            </div>
          </Field>

          {/* Roles list */}
          <Field
            label="2. Select Role"
            required
            error={errors.roleName}
          >
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/50">
                <Search
                  size={14}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search role..."
                  value={searchRole}
                  onChange={(event) =>
                    setSearchRole(event.target.value)
                  }
                  className="w-full border-none bg-transparent text-[13px] outline-none placeholder:text-gray-400 dark:text-gray-200"
                />
              </div>

              <div className="custom-scrollbar h-[280px] space-y-1 overflow-y-auto p-2">
                {fetching ? (
                  <LoadingState />
                ) : filteredRoles.length === 0 ? (
                  <EmptyState message="No roles found." />
                ) : (
                  filteredRoles.map((role) => {
                    const active =
                      form.roleName.toLowerCase() ===
                      role.name.toLowerCase();

                    return (
                      <SelectionItem
                        key={role.id || role.name}
                        title={role.name}
                        subtitle={
                          role.description ||
                          "System role"
                        }
                        active={active}
                        icon={
                          <ShieldCheck size={15} />
                        }
                        onClick={() =>
                          selectRole(role.name)
                        }
                      />
                    );
                  })
                )}
              </div>
            </div>
          </Field>
        </div>

        {/* Selected values */}
        {(form.userId || form.roleName) && (
          <div className="mx-6 mb-5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-500">
              Selected user ID:
              <span className="ml-2 font-semibold text-gray-800 dark:text-gray-200">
                {form.userId || "Not selected"}
              </span>
            </p>

            <p className="mt-1 text-gray-500">
              Selected role:
              <span className="ml-2 font-semibold text-gray-800 dark:text-gray-200">
                {form.roleName || "Not selected"}
              </span>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 rounded-b-xl border-t border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={submit}
            disabled={submitting || fetching}
            className="flex items-center gap-2 rounded-lg bg-[#405189] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#364473] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {submitting
              ? "Assigning..."
              : "Assign Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface SelectionItemProps {
  title: string;
  subtitle?: string;
  active: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
}

function SelectionItem({
  title,
  subtitle,
  active,
  icon,
  onClick,
}: SelectionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition-all ${
        active
          ? "border-[#405189]/20 bg-[#405189]/10"
          : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div
          className={
            active
              ? "text-[#405189]"
              : "text-gray-400"
          }
        >
          {icon}
        </div>

        <div className="flex min-w-0 flex-col">
          <span
            className={`truncate text-[12px] font-bold ${
              active
                ? "text-[#405189]"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {title}
          </span>

          {subtitle && (
            <span className="truncate text-[9px] text-gray-400">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
          active
            ? "border-[#405189] bg-[#405189]"
            : "border-gray-300 dark:border-gray-600"
        }`}
      >
        {active && (
          <Check
            size={10}
            className="text-white"
            strokeWidth={4}
          />
        )}
      </div>
    </button>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-2 p-8 text-sm text-gray-400">
      <Loader2 className="h-4 w-4 animate-spin" />
      Loading data...
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-8 text-center text-sm italic text-gray-400">
      {message}
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}

function Field({
  label,
  children,
  error,
  required,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </Label>

      {children}

      {error && (
        <p className="mt-1 text-[11px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}