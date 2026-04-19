// context/PermissionContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

// 1. Define the User Shape (Scalable)
interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  permissions: string[]; // This matches your JSON data
}

// 2. Define the Context Value Shape
interface PermissionContextType {
  user: User | null;
  hasPermission: (permission: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType | null>(null);

// 3. The Provider Component
export const PermissionProvider = ({ 
  user, 
  children 
}: { 
  user: User | null; 
  children: ReactNode 
}) => {
  
  // Logic is centralized here once
  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) ?? false;
  };

  return (
    <PermissionContext.Provider value={{ user, hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

// 4. Custom Hook for easy access
export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};