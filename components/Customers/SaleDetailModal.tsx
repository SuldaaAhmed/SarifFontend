interface Props {
  sale: any;
  onClose: () => void;
}

export default function SaleDetailModal({ sale, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl bg-white rounded-lg p-6">

        <h3 className="text-lg font-semibold mb-4">
          Sale Details
        </h3>

        {/* SALE INFO */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div><strong>Customer:</strong> {sale.customerName}</div>
          <div><strong>Date:</strong> {new Date(sale.createdAt).toLocaleString()}</div>
          <div><strong>SubTotal:</strong> {sale.subTotal}</div>
          <div><strong>Discount:</strong> {sale.discount}</div>
          <div><strong>Total:</strong> {sale.totalAmount}</div>
          <div><strong>Paid:</strong> {sale.paidAmount}</div>
          <div><strong>Balance:</strong> {sale.balance}</div>
          <div><strong>Status:</strong> {sale.status}</div>
        </div>

        {/* ITEMS TABLE */}
        <div className="border rounded">
          <div className="bg-gray-100 grid grid-cols-4 px-4 py-2 text-xs font-medium uppercase">
            <div>Service</div>
            <div>Price</div>
            <div>Qty</div>
            <div>Total</div>
          </div>

          {sale.items.map((item: any) => (
            <div
              key={item.serviceItemId}
              className="grid grid-cols-4 px-4 py-2 text-sm border-t"
            >
              <div>{item.serviceName}</div>
              <div>{item.price}</div>
              <div>{item.quantity}</div>
              <div>{item.total}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
