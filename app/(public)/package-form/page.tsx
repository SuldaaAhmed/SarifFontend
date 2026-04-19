// Mark this file as a Client Component
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { packageService } from "@/lib/packages";

// Define interface for form data structure
export interface PackageRequestFormData {
  name: string;
  email: string;
  phone: string;
  packageId: string;
  message: string;
}

// Component to handle the package request form content
function PackageFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const packageId = searchParams.get("package") || "";
  const packageName = searchParams.get("name") || "Selected Package";
  const packageType = searchParams.get("type") || "";

  // State to manage form data
  const [formData, setFormData] = useState<PackageRequestFormData>({
    name: "",
    email: "",
    phone: "",
    packageId: packageId, // Set the initial packageId from the search param
    message: "",
  });

  // State to manage submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call (Replace this with the actual API call)
      const res = await packageService.createequestPackage(formData);
      
      if (res) {
        // Success message on successful form submission
        setSubmitMessage("Thank you! We've received your request. Our team will contact you within 24 hours.");
        
        // Reset the form and redirect after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            packageId: "",  // Optionally reset the packageId if required
            message: "",
          });
          router.push("/"); // Redirect to home page after submission
        }, 3000);
      }
    } catch (error) {
      // Handle any submission errors
      console.error("Submission error:", error);
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFECCD] to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#D51116] hover:text-[#F39220] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Packages
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#D51116] mb-4">
            Request {packageName} Package
          </h1>
          <p className="text-gray-600">
            Fill out the form below and our team will get in touch with you shortly
            to discuss your {packageType.toLowerCase()} needs.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-[#F39220]/20">
          {submitMessage ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Success!</h3>
              <p className="text-gray-600 text-lg">{submitMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D51116] focus:ring-2 focus:ring-[#D51116]/20 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D51116] focus:ring-2 focus:ring-[#D51116]/20 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D51116] focus:ring-2 focus:ring-[#D51116]/20 outline-none transition"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D51116] focus:ring-2 focus:ring-[#D51116]/20 outline-none transition"
                  placeholder="Tell us about your project requirements, timeline, budget, or any specific needs..."
                />
              </div>

              {/* Package Info Display */}
              <div className="bg-[#FFECCD] rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong>Selected Package:</strong> {packageName} ({packageType})
                  <br />
                  <span className="text-xs text-gray-600">
                    This information helps us prepare the best proposal for you.
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D51116] hover:bg-[#F39220] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function PackageFormPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFECCD] flex items-center justify-center">
          <div className="animate-pulse text-[#D51116]">Loading form...</div>
        </div>
      }
    >
      <PackageFormContent />
    </Suspense>
  );
}
