"use client";

import Button from "@/components/common/ui/button/Button";

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  loading,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl">
        <div className="border-b p-5 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Confirmation
          </h3>
        </div>

        <div className="p-6 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this data?  
          This action cannot be undone.
        </div>

        <div className="flex justify-end gap-3 border-t p-5 dark:border-gray-800">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
      <Button
  variant="primary"
  onClick={onConfirm}
  disabled={loading}
  className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
>
  {loading ? "Deleting..." : "Delete"}
</Button>

        </div>
      </div>
    </div>
  );
}
