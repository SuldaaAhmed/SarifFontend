"use client";

import React, { useEffect, useState } from "react";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";
import SalesFilterModal from "../common/SalesFilterModal";
import PaymentModal from "./PaymentModal";

interface SaleItem {
  serviceItemId: string;
  serviceName: string;
  price: number;
  quantity: number;
  total: number;
}

interface SaleDto {
  saleId: string;
  customerName: string;
  subTotal: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: string;
  createdAt: string;
  items: SaleItem[];
}

export default function SalesUnpaidTable() {
  const [sales, setSales] = useState<SaleDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentSale, setPaymentSale] = useState<SaleDto | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    loadSales();
  }, [filters, pageNumber]);

  async function loadSales() {
    setLoading(true);
    try {
      const res = await CustomerService.getAUnpaidSales(
        pageNumber,
        pageSize,
        filters.startDate,
        filters.endDate,
        "Unpaid"
      );

      if (res.data.success) {
        const data = res.data.data;
        const allSales = data?.data || [];

        const unpaidOnly = allSales.filter(
          (s: SaleDto) => s.balance > 0
        );

        setSales(unpaidOnly);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } else {
        toast.error("Failed to load unpaid sales");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Unpaid Sales
            </h2>
            <p className="text-sm text-gray-500">
              Manage outstanding balances
            </p>
          </div>

          <button
            onClick={() => setFilterOpen(true)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl 
                       hover:bg-indigo-700 transition shadow-sm"
          >
            Filter
          </button>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-left">Paid</th>
                <th className="px-6 py-4 text-left">Balance</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Loading unpaid sales...
                  </td>
                </tr>
              )}

              {!loading && sales.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                    No unpaid sales found
                  </td>
                </tr>
              )}

              {!loading &&
                sales.map((sale) => (
                  <tr
                    key={sale.saleId}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {sale.customerName}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {sale.totalAmount}
                    </td>

                    <td className="px-6 py-4 text-green-600 font-medium">
                      {sale.paidAmount}
                    </td>

                    <td className="px-6 py-4 font-semibold text-red-600">
                      {sale.balance}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">
                        {sale.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setPaymentSale(sale)}
                        className="px-4 py-1.5 rounded-lg bg-green-600 text-white 
                                   hover:bg-green-700 transition shadow-sm font-medium"
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-6 py-5 border-t bg-gray-50">

          <span className="text-sm text-gray-500">
            Page {pageNumber} of {totalPages}
          </span>

          <div className="flex items-center gap-3">

            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pageNumber === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white">
              {pageNumber}
            </button>

            <button
              disabled={pageNumber >= totalPages}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pageNumber >= totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              Next
            </button>

          </div>
        </div>

      </div>

      {/* PAYMENT MODAL */}
      {paymentSale && (
        <PaymentModal
          sale={paymentSale}
          onClose={() => setPaymentSale(null)}
          onSuccess={loadSales}
        />
      )}

      {/* FILTER MODAL */}
      <SalesFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => {
          setPageNumber(1);
          setFilters(f);
          setFilterOpen(false);
        }}
      />

    </div>
  );
}
