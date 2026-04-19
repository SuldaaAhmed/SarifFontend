"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import ServicesItemFormModal, { ServiceItemFormData } from "./ServicesItemFormModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";

interface ServiceDto {
  id: string;
  name: string;
  description: string;
  serviceName: string;
  possiblePrice: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  serviceId: string;
}

export default function ServicesItemTable() {
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedService, setSelectedService] =
    useState<ServiceDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const res = await CustomerService.getAllServicesItems();

      if (res.data.success) {
        const data = res.data.data;

        if (Array.isArray(data)) {
          setServices(data);
        } else if (Array.isArray(data?.data)) {
          setServices(data.data);
        } else {
          setServices([]);
        }
      } else {
        toast.error(res.data.message || "Failed to load service items");
        setServices([]);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: ServiceItemFormData) {
    try {
      let res;

      if (mode === "add") {
        res = await CustomerService.createServiceItem(data);
      } else {
        if (!selectedService?.id) return;
        res = await CustomerService.updateServiceItem(
          selectedService.id,
          data
        );
      }

      if (res.data.success) {
        toast.success(res.data.message || "Operation successful");
        setOpenModal(false);
        loadServices();
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  async function confirmDelete() {
    if (!selectedService) return;

    try {
      setDeleting(true);
      const res = await CustomerService.deleteServiceItem(selectedService.id);

      if (res.data.success) {
        toast.success(res.data.message || "Service item deleted successfully");
        setOpenDelete(false);
        loadServices();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  const filteredServices = Array.isArray(services)
    ? services.filter((s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase()) ||
        s.serviceName?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Service Items
            </h2>
            <p className="text-sm text-gray-500">
              Manage individual service items and pricing
            </p>
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedService(null);
              setOpenModal(true);
            }}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl 
                       hover:bg-indigo-700 transition shadow-sm"
          >
            + Add New
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="w-80">
            <Input
              placeholder="Search service items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full text-sm"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Created At</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Loading service items...
                  </td>
                </tr>
              )}

              {!loading && filteredServices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                    No service items found
                  </td>
                </tr>
              )}

              {!loading &&
                filteredServices.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition">

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {s.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {s.serviceName}
                    </td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      ${s.possiblePrice}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {s.description}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(s.createdAt).toISOString().split("T")[0]}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">

                        <button
                          onClick={() => {
                            setMode("edit");
                            setSelectedService(s);
                            setOpenModal(true);
                          }}
                          className="px-3 py-1 rounded-lg text-indigo-600 
                                     hover:bg-indigo-50 transition font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedService(s);
                            setOpenDelete(true);
                          }}
                          className="px-3 py-1 rounded-lg text-red-600 
                                     hover:bg-red-50 transition font-medium"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing {filteredServices.length} of {services.length} entries
          </p>
        </div>

      </div>

      <ServicesItemFormModal
        open={openModal}
        mode={mode}
        initialData={selectedService ?? undefined}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
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
