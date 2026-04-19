import {
  Settings,
  Package,
  Users,
  GraduationCap,
  CreditCard,
  List,
  LayoutDashboard,
  UserCircle,
  Banknote,
  BarChart3,
  Briefcase,
  Repeat,
  ClipboardList,

  // ADD THESE 👇
  Building2,
  GitBranch,
  User,
  ArrowLeftRight,
  ArrowUpDown,
  Wallet,
  Receipt,
  Landmark,
  Layers,
  FileText,
  Percent,
  Calendar,
  ShieldCheck,
  Menu
} from "lucide-react";

export const IconMap: Record<string, any> = {
  // Main
  dashboard: LayoutDashboard,
  registrations: Users,
  finances: Banknote,
  operations: Briefcase,
  subscriptions: Repeat,
  reports: BarChart3,
  settings: Settings,

  // Users
  users: Users,
  agency: Building2,
  branches: GitBranch,
  customers: User,

  // Finance
  currency: Landmark,
  rate: Percent,
  account: Wallet,
  transaction: ArrowLeftRight,
  transactiondetail: ArrowUpDown,

  // Operations
  transfers: ArrowLeftRight,
  deposits: ArrowUpDown,
  withdrawals: ArrowUpDown,
  expense: Receipt,
  loan: Wallet,

  // Reports
  profit: Percent,
  daily: Calendar,

  // Settings
  profile: UserCircle,
  roles: ShieldCheck,
  permissions: ShieldCheck,
  menu: Menu,
  module: Layers,
  role: ShieldCheck,

  // fallback
  package: Package,
};


export const getIcon = (name: string) => {
  if (!name) return Package;

  const safeName = name
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(/-/g, "");

  return IconMap[safeName] || Package;
};