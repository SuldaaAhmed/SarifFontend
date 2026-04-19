// lib/customer.ts
import api from "./api";

export const CustomerService = {



  getCustomers(page: number = 1, pageSize: number = 10, search: string = "") {

  return api.get(`/Customer/customer?page=${page}&pageSize=${pageSize}&search=${search}`);
},

  updateCustomer(id: string, data: any) {
  return api.put(`/Customer/customer/${id}`, data);
},


  createCustomer(data: any) {    
    //console.log("Creating user with data:", data);
    return api.post("/Customer/customer", data);
  },

  deleteCustomer(id: string) {
    return api.delete(`/Customer/customer/${id}`);
  },


  // GET ALL (with pagination)
  getAllCustomer(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-customers", {
      params: { pageNumber, pageSize },
    });
  },


  // ===============================
  // GET CUSTOMERS WITH FILTER
  // ===============================
  getAllBySalesCustomer(
    pageNumber: number = 1,
    pageSize: number = 10,
    phoneNumber?: string,
    startDate?: string,
    endDate?: string
  ) {
    return api.get("/Customer/get-customer-sale", {
      params: {
        pageNumber,
        pageSize,
        ...(phoneNumber && { phoneNumber }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
  },

  // GET BY ID
  getById(id: string) {
    return api.get(`/Customer/get-customers/${id}`);
  },





      // CREATE
  createSales(data: any) {
    return api.post("/Customer/create-sales", data);
  },


  // GET ALL (with pagination)
  getAllServices(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-services", {
      params: { pageNumber, pageSize },
    });
  },

   // CREATE
  createService(data: any) {
    return api.post("/Customer/create-service", data);
  },

    // UPDATE
  updateService(id: string, data: any) {
    return api.put(`/Customer/update-service/${id}`, data);
  },

    // DELETE
  deleteService(id: string) {
    return api.delete(`/Customer/delete-service/${id}`);
  },


    // GET ALL (with pagination)
  getAllServicesItems(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-serviceitems", {
      params: { pageNumber, pageSize },
    });
  },

   // CREATE
  createServiceItem(data: any) {
    return api.post("/Customer/create-serviceitem", data);
  },

    // UPDATE
  updateServiceItem(id: string, data: any) {
    return api.put(`/Customer/update-serviceitem/${id}`, data);
  },

    // DELETE
  deleteServiceItem(id: string) {
    return api.delete(`/Customer/delete-serviceitem/${id}`);
  },


getAllSales(
  pageNumber = 1,
  pageSize = 10,
  startDate?: string,
  endDate?: string,
  status?: string
) {
  const params: any = {
    pageNumber,
    pageSize,
  };

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (status) params.status = status;

  return api.get("/Customer/get-sales", { params });
},

// ADD PAYMENT
addPayment(data: { saleId: string; amount: number }) {
  return api.post("/Customer/add-payment", data);
},



getAUnpaidSales(
  pageNumber = 1,
  pageSize = 10,
  startDate?: string,
  endDate?: string,
  status?: string
) {
  const params: any = {
    pageNumber,
    pageSize,
  };

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (status) params.status = status;

  return api.get("/Customer/get-sales", { params });
},


  // GET ALL (with pagination)
  getAllExpensesCategories(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-expenses-category", {
      params: { pageNumber, pageSize },
    });
  },

   // CREATE
  createExpensesCategory(data: any) {
    return api.post("/Customer/create-expenses-category", data);
  },

      // UPDATE
  updateExpensesCategory(id: string, data: any) {
    return api.put(`/Customer/update-expenses-category/${id}`, data);
  },

      // DELETE
  deleteExpensesCategory(id: string) {
    return api.delete(`/Customer/delete-expenses-category/${id}`);
  },


    // GET ALL (with pagination)
  getAllExpenses(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-expenses", {
      params: { pageNumber, pageSize },
    });
  },
     // CREATE
  createExpenses(data: any) {
    return api.post("/Customer/create-expenses", data);
  },

        // UPDATE
  updateExpenses(id: string, data: any) {
    return api.put(`/Customer/update-expenses/${id}`, data);
  },

        // DELETE
  deleteExpenses(id: string) {
    return api.delete(`/Customer/delete-expenses/${id}`);
  },

     getExpensesSummary(filters?: any) {
  return api.post("Customer/expense-breakdown", null, {
    params: filters,
  });
},


};
