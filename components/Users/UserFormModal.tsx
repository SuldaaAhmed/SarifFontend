"use client";

import React, { useEffect, useState, useCallback } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { SetupService } from "@/lib/setup";
import { X, Save, EyeOff, Eye, Loader2 } from "lucide-react";

export interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  agencyName?: string;
  confirmPassword: string;
}

// ── Agency dto: la isticmaalo dropdown-ka Agency Name ──
interface AgencyDto {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: UserFormData;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

const createEmptyForm = (): UserFormData => ({
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
  agencyName: "",
});

export default function UserFormModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<UserFormData>(() => createEmptyForm());
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── Agencies: state-ka + loading-ka gaarka ah ──
  const [agencies, setAgencies] = useState<AgencyDto[]>([]);
  const [loadingAgencies, setLoadingAgencies] = useState(false);

  const [formKey, setFormKey] = useState(0);

  // Rule kasta si gaar ah ayaa loo hubinayaa — checklist-ka ayaa isticmaalaya
  const passwordRules = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
  };
  const isStrongPassword = Object.values(passwordRules).every(Boolean);

  // ── Reset helper: hal meel oo lagu safeeyo form-ka + dhammaan UI state-yada la xiriira ──
  const resetForm = useCallback(() => {
    setForm(createEmptyForm());
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormKey((k) => k + 1); // force remount — DOM inputs dhammaantood faaruq
  }, []);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setForm({
          ...initialData,
          phone: initialData.phone ?? "",
          password: "",
          confirmPassword: "",
          agencyName: initialData.agencyName ?? "",
        });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
        setFormKey((k) => k + 1); // remount si DOM-ku ula mid noqdo state-ka cusub
      } else {
        resetForm();
      }
    } else {
      // Safety net: haddii modal-ka la xidho si kale (click-outside, route change, iwm)
      resetForm();
    }
  }, [mode, initialData, open, resetForm]);

  // ── Soo qaadista Agencies-ka: waxay dhacdaa marka modal-ku furmo ──
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const fetchAgencies = async () => {
      setLoadingAgencies(true);
      try {
        // pageSize weyn si dropdown-ku u helo dhammaan agencies-ka (isla structure-ka AgencyTable)
        const res = await SetupService.getAgencies(1, 100);
        const apiResponse = res.data?.data;
        if (!cancelled) {
          setAgencies(apiResponse?.data || []);
        }
      } catch {
        if (!cancelled) setAgencies([]);
      } finally {
        if (!cancelled) setLoadingAgencies(false);
      }
    };

    fetchAgencies();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const update = (k: keyof UserFormData, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const validate = () => {
    const e: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;

    const value = form.email.trim();

    if (!form.fullName.trim()) e.fullName = "Full name is required";

    if (form.phone && !/^\d{6,10}$/.test(form.phone)) {
      e.phone = "Phone number must be 6 to 10 digits";
    }
    if (!emailRegex.test(value) && !usernameRegex.test(value)) {
      e.email = "Please enter a valid email address or username.";
    }

    if (mode === "add") {
      // FIX: horey wuxuu ahaa `length < 6` — checklist-ka oo dhan ayaa hadda
      // loo baahan yahay (8+ chars, uppercase, lowercase, number, special)
      if (!isStrongPassword) {
        e.password = "Password must meet all requirements below";
      }
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords mismatch";
    }

    setErrors(e);
    return !Object.keys(e).length;
  };

  // ── Xidhista modal-ka: waxay marka hore safeeysaa form-ka, ka dibna wacdaa onClose ──
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, handleEsc]);

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    try {
      await onSubmit(form);
      resetForm(); // xogta la safeeyo marka submit-ku guulaysto
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    /* ── Backdrop ── */
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      {/* RESPONSIVE: max-h-[90dvh] overflow-y-auto mx-4 — same as WithdrawFormModal */}
      <div
        className="relative w-full max-w-xl bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 max-h-[90dvh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="relative flex items-center justify-center p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="text-center">
            {/* RESPONSIVE: text-base sm:text-lg — same as WithdrawFormModal */}
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
              {mode === "add" ? "Add New User" : "Edit User Profile"}
            </h3>
          </div>
          {/* RESPONSIVE: p-1.5 hover:bg-gray-100 rounded-full — same as WithdrawFormModal */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* BODY — key={formKey}: reset kasta DOM inputs-ka waa la burburiyaa,
            kuwa cusub oo faaruq ah ayaa la dhisaa.
            AUTOFILL FIX: autoComplete="off" container-ka oo dhan */}
        {/* RESPONSIVE: p-5 sm:p-6 — padding yar mobile-ka */}
        <div key={formKey} className="p-5 sm:p-6 space-y-4">

          {/* Row 1 — Full Name + Email */}
          {/* RESPONSIVE: grid-cols-1 md:grid-cols-2 — mobile single column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full Name" required error={errors.fullName}>
              <Input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Full Name"
                autoComplete="off"
                name={`fullname-${formKey}`}
              />
            </Field>

            <Field label="Email / Username" required error={errors.email}>
              <Input
                type="text"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Email or Username"
                autoComplete="on"
                name={`email-${formKey}`}
              />
            </Field>
          </div>

          {/* Row 2 — Phone + Gender + Agency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Phone Number" error={errors.phone}>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  update(
                    "phone",
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="Phone"
                autoComplete="off"
                name={`phone-${formKey}`}
              />
            </Field>

            <Field label="Gender">
              <GenderSelect
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
              />
            </Field>

            <Field label="Agency Name">
              <div className="relative">
                <select
                  value={form.agencyName}
                  onChange={(e) => update("agencyName", e.target.value)}
                  disabled={loadingAgencies}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:opacity-60"
                >
                  <option value="">
                    {loadingAgencies ? "Loading agencies..." : "Select Agency"}
                  </option>

                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.name}>
                      {agency.name}
                    </option>
                  ))}
                </select>

                {loadingAgencies && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                )}
              </div>
            </Field>
          </div>

          {/* Row 3 — Password fields (divider on top) */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-900 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Password"
              required={mode === "add"}
              error={errors.password}
            >
              <div className="relative">
                {/* AUTOFILL FIX:
                    - autoComplete="new-password" — browser-ka wuxuu ogaadaa
                      in tani tahay password CUSUB, mana buuxiyo password kaydsan
                    - name dynamic ah (formKey) — browser-ku ma aqoonsado field-ka
                      si uu password ugu keydiyo/soo celiyo */}
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  name={`new-user-password-${formKey}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* CHECKLIST — rule kasta wuxuu leeyahay ✓/✗ u gaar ah,
                  si user-ku u arko midka qaldan.
                  Wuxuu muuqdaa KALIYA marka form.password (React state) buuxo —
                  autofill hadda ma buuxin karo state-ka, marka modal furan
                  wuu faaruq yahay */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <Rule valid={passwordRules.length} text="At least 8 characters" />
                  <Rule valid={passwordRules.uppercase} text="One uppercase letter" />
                  <Rule valid={passwordRules.lowercase} text="One lowercase letter" />
                  <Rule valid={passwordRules.number} text="One number" />
                  <Rule valid={passwordRules.special} text="One special character" />
                  {isStrongPassword && (
                    <p className="text-xs font-medium text-green-600">✓ Strong password</p>
                  )}
                </div>
              )}
            </Field>

            <Field
              label="Confirm Password"
              required={mode === "add"}
              error={errors.confirmPassword}
            >
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    update("confirmPassword", e.target.value)
                  }
                  placeholder="••••••••"
                  autoComplete="new-password"
                  name={`confirm-user-password-${formKey}`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {form.confirmPassword && (
                <p
                  className={`mt-2 text-xs ${form.password === form.confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                    }`}
                >
                  {form.password === form.confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </Field>
          </div>
        </div>

        {/* ACTIONS — same layout as WithdrawFormModal (flex gap-3, py-2.5, w-1/2) */}
        <div className="flex gap-3 px-5 sm:px-6 pb-5 sm:pb-6">
          <button
            onClick={handleClose}
            className="w-1/2 border border-gray-300 py-2.5 rounded text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="w-1/2 flex items-center justify-center gap-2 bg-[#405189] hover:bg-[#364574] text-white py-2.5 rounded text-[13px] font-semibold transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {mode === "add" ? "Create User" : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Helpers ── */

function Rule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${valid ? "text-green-600" : "text-red-500"
        }`}
    >
      <span>{valid ? "✓" : "✗"}</span>
      <span>{text}</span>
    </div>
  );
}

function GenderSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  );
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}