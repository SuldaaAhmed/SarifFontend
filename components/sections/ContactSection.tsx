"use client";

import { UtilityService } from "@/lib/utils";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

interface ContactRequestDto {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactRequestDto>({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validation functions
  const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Full name must be at least 2 characters";
    if (name.trim().length > 50) return "Full name must be less than 50 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      return "Full name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return "Phone number is required";
    // Remove common phone number formatting characters for validation
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d+$/.test(cleaned)) return "Phone number can only contain digits";
    if (cleaned.length < 7) return "Phone number must be at least 7 digits";
    if (cleaned.length > 15) return "Phone number must be less than 15 digits";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email address is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (email.length > 100) return "Email address must be less than 100 characters";
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 30) return "Message must be at least 30 characters";
    if (message.trim().length > 1000) return "Message must be less than 1000 characters";
    return undefined;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        return validateFullName(value);
      case "phone":
        return validatePhone(value);
      case "email":
        return validateEmail(value);
      case "message":
        return validateMessage(value);
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: validateFullName(formData.fullName),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };

    // Remove undefined values
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== undefined)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Validate all fields
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const response = await UtilityService.createContactRequest(formData);

      if (response.data.success) {
        toast.success("Contact request sent successfully!");
        setSubmitted(true);
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get input class names based on validation state
  const getInputClassName = (fieldName: string): string => {
    const baseClass = "mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-1";
    if (touched[fieldName] && errors[fieldName as keyof FormErrors]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500`;
    }
    if (touched[fieldName] && !errors[fieldName as keyof FormErrors] && formData[fieldName as keyof ContactRequestDto]) {
      return `${baseClass} border-green-500 focus:border-[#00bf63] focus:ring-[#00bf63]`;
    }
    return `${baseClass} border-gray-300 focus:border-[#00bf63] focus:ring-[#00bf63]`;
  };

  return (
    <section className="bg-gradient-to-br from-[#00bf63]/5 to-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span
            className="inline-block mb-3 rounded-full
            border border-[#00bf63]/30
            px-5 py-1 text-xs font-semibold
            text-[#00bf63] uppercase tracking-wide"
          >
            Contact Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044]">
            Let's Discuss Your Project
          </h2>

          <p className="mt-4 text-gray-600">
            Share your idea with us and let's turn it into a powerful digital
            solution tailored to your business goals.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT INFO */}
          <div className="space-y-8">
            <p className="text-gray-600 max-w-md">
              We work closely with businesses and individuals to deliver
              innovative, scalable, and reliable digital services.
            </p>

            <div className="space-y-5">

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#00bf63] shadow border border-[#00bf63]/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#090044]">Address</p>
                  <p className="text-sm text-gray-600">Somalia</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#00bf63] shadow border border-[#00bf63]/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#090044]">Email</p>
                  <p className="text-sm text-gray-600">
                    cadnankahiye@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#00bf63] shadow border border-[#00bf63]/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#090044]">Phone</p>
                  <p className="text-sm text-gray-600">+252 610 631 155</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center
                  rounded-lg bg-white text-[#00bf63] shadow border border-[#00bf63]/20">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#090044]">WhatsApp</p>
                  <p className="text-sm text-gray-600">+252 610 631 155</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-2xl bg-white p-8 shadow-xl border border-[#00bf63]/20">
            {submitted ? (
              <div className="text-center text-lg font-semibold text-[#090044]">
                <p>Thank you for reaching out!</p>
                <p className="text-[#00bf63] mt-2">
                  We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#090044]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className={getInputClassName("fullName")}
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#090044]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your phone number"
                    className={getInputClassName("phone")}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#090044]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your email address"
                    className={getInputClassName("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#090044]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project..."
                    className={getInputClassName("message")}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#00bf63] px-6 py-3
                  text-white font-semibold
                  hover:bg-[#090044] transition disabled:opacity-70
                  disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}