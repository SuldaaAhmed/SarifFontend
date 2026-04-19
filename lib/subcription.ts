import api from "./api";

export const SubscriptionService = {



  getPlans(page: number = 1, pageSize: number = 10, search: string = "") {

  return api.get(`/Subscription/plans?page=${page}&pageSize=${pageSize}&search=${search}`);
},

  createPlan(data: any) {  
    //console.log("Creating user with data:", data);
    return api.post("/Subscription/plan", data);
  },

    updatePlan(id: string, data: any) {
  return api.put(`/Subscription/plan/${id}`, data);
},

  deletePlan(id: string) {
    return api.delete(`/Subscription/plan/${id}`);
  },


getPlanPermissions(page: number = 1, pageSize: number = 10, search: string = "") {

  return api.get(`/Subscription/plan/permissions?page=${page}&pageSize=${pageSize}&search=${search}`);
},

    AssignPlanPermissions(data: any) {    
    //console.log("Creating user with data:", data);
    return api.post("/Subscription/plan/permissions", data);
  },

UpdatePlanPermissions(id: string, data: any) {
  return api.put(`/Subscription/plan/permissions/${id}`, data);
},

 deletePlanPermissions(id: string) {
    return api.delete(`/Subscription/plan/permissions/${id}`);
  },


  getSubscriptions(page: number = 1, pageSize: number = 10, search: string = "") {

  return api.get(`/Subscription/subscriptions?page=${page}&pageSize=${pageSize}&search=${search}`);
},

    createSubscription(data: any) {    
    //console.log("Creating user with data:", data);
    return api.post("/Subscription/subscription", data);
  },

  updateSubscription(id: string, data: any) {
  return api.put(`/Subscription/subscription/${id}`, data);
},

 deleteSubscription(id: string) {
    return api.delete(`/Subscription/subscription/${id}`);
  },
};