"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  ArrowRightLeft,
} from "lucide-react";

/* =========================
   TYPES & MOCK DATA
========================= */
const CURRENCIES = [
  { code: "SOS", symbol: "S", name: "Somali Shilling" },
  { code: "KES", symbol: "K", name: "Kenyan Shilling" },
  { code: "ETB", symbol: "E", name: "Ethiopian Birr" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
];

const MOCK_RATES: Record<string, number> = {
  USD: 1,
  SOS: 26500,
  KES: 131.5,
  ETB: 56.4,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67
};

export default function DashboardContent() {
  const { user, loading: authLoading } = useAuth();
  
  // Exchange State
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("SOS");
  const [amount, setAmount] = useState<number>(100);
  const [result, setResult] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const rate = MOCK_RATES[toCurr] / MOCK_RATES[fromCurr];
    setResult(amount * rate);
  }, [fromCurr, toCurr, amount]);

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  if (authLoading || !user) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-[1600px] mx-auto p-4">
      
      {/* 1. DYNAMIC RATE TICKER - 6 CARDS PER ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {CURRENCIES.map(curr => (
          <RateBar 
            key={curr.code}
            pair={`USD/${curr.code}`} 
            rate={MOCK_RATES[curr.code].toLocaleString()} 
            trend="+0.24%" 
            up={true} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. RECENT TRANSACTIONS (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
              
              {/* SEARCH BAR */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Pair</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <TrxRow id="TX-102" pair="USD/KES" amount="450.00" status="COMPLETED" />
                <TrxRow id="TX-103" pair="EUR/USD" amount="1,200.00" status="PENDING" />
                <TrxRow id="TX-104" pair="USD/SOS" amount="50.00" status="COMPLETED" />
                <TrxRow id="TX-105" pair="GBP/USD" amount="250.00" status="PENDING" />
                                <TrxRow id="TX-104" pair="USD/SOS" amount="50.00" status="COMPLETED" />
                <TrxRow id="TX-105" pair="GBP/USD" amount="250.00" status="PENDING" />
                <TrxRow id="TX-104" pair="USD/SOS" amount="50.00" status="COMPLETED" />
                <TrxRow id="TX-105" pair="GBP/USD" amount="250.00" status="PENDING" />

              </tbody>
            </table>
          </div>
        </div>

        {/* 3. QUICK SWAP TOOL */}
        <div className="bg-[#1e40af] rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-900/20 flex flex-col min-h-[500px]">
          <div className="mb-6">
            <h2 className="text-2xl font-black">Quick Swap</h2>
            <p className="text-blue-200 text-xs">Instant multi-currency conversion</p>
          </div>

          <div className="space-y-3 relative">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-blue-200 uppercase">Send Amount</label>
                <select 
                  value={fromCurr} 
                  onChange={(e) => setFromCurr(e.target.value)}
                  className="bg-transparent font-bold text-sm outline-none cursor-pointer"
                >
                  {Object.keys(MOCK_RATES).map(code => <option key={code} value={code} className="text-slate-900">{code}</option>)}
                </select>
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-transparent w-full text-3xl font-black outline-none placeholder:text-white/20"
              />
            </div>

            <div className="flex justify-center -my-6 relative z-20">
              <button 
                onClick={handleSwap}
                className="bg-white text-blue-600 p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
              >
                <ArrowRightLeft size={20} className="rotate-90" />
              </button>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-blue-200 uppercase">Receive Estimate</label>
                <select 
                  value={toCurr} 
                  onChange={(e) => setToCurr(e.target.value)}
                  className="bg-transparent font-bold text-sm outline-none cursor-pointer"
                >
                  {Object.keys(MOCK_RATES).map(code => <option key={code} value={code} className="text-slate-900">{code}</option>)}
                </select>
              </div>
              <div className="text-3xl font-black truncate">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-white/5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-blue-200">Current Rate:</span>
              <span>1 {fromCurr} = {(MOCK_RATES[toCurr] / MOCK_RATES[fromCurr]).toFixed(4)} {toCurr}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function TrxRow({ id, pair, amount, status }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-xs font-mono text-slate-400">{id}</td>
      <td className="px-6 py-4 font-bold text-slate-700">{pair}</td>
      <td className="px-6 py-4 font-black text-slate-900">${amount}</td>
      <td className="px-6 py-4 text-right">
        <span className={`px-3 py-1 rounded-md text-[9px] font-black ${status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function RateBar({ pair, rate, trend, up }: any) {
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-sm min-w-0">
      <div className={`shrink-0 w-1.5 h-1.5 rounded-full ${up ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1 truncate">{pair}</p>
        <p className="text-xs font-black text-slate-800 truncate">{rate}</p>
      </div>
      <span className={`shrink-0 text-[9px] font-black ${up ? 'text-emerald-600' : 'text-rose-600'}`}>{trend}</span>
    </div>
  );
}