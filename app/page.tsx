"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function CheckerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    const searchTerms = searchQuery.trim().split(/\s+/);
    
    let query = supabase.from("laptops").select("*");

    searchTerms.forEach(term => {
      query = query.or(`brand.ilike.%${term}%,model.ilike.%${term}%`);
    });

    const { data, error } = await query.limit(10);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setResults(data || []);
    }

    setIsLoading(false);
  };

  return (
    <main className="bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Laptop Upgrade Checker
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Stop guessing before buying PC parts. Search your laptop model to check its maximum RAM and SSD upgrade limits.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3">
            Enter Laptop Model
          </label>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., ThinkPad T480, ROG Zephyrus..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-semibold transition-colors shadow-sm disabled:bg-blue-400"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {hasSearched ? (
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-10 text-slate-500">Searching database...</div>
            ) : results.length > 0 ? (
              results.map((laptop) => (
                <div key={laptop.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{laptop.brand} {laptop.model}</h3>
                  
                  <div className="space-y-6">
                    {laptop.configurations?.map((config: any, index: number) => (
                      <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <h4 className="font-semibold text-slate-800 mb-2">
                          {config.label || "Standard Configuration"}
                        </h4>
                        {config.notes && (
                          <p className="text-sm text-slate-500 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                            💡 {config.notes}
                          </p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Memory (RAM)</span>
                            <div className="mt-2 space-y-1">
                              <p className="font-medium text-slate-800">
                                Upgradeable: {config.memory?.status === 'yes' ? '✅ Yes' : '❌ No'}
                              </p>
                              {config.memory?.onboardGb > 0 && (
                                <p className="text-sm text-slate-600">Onboard RAM: {config.memory.onboardGb}GB</p>
                              )}
                              {config.memory?.maxTotalGb && (
                                <p className="text-sm text-slate-600">Max Capacity: {config.memory.maxTotalGb}GB</p>
                              )}
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Storage (SSD)</span>
                            <div className="mt-2 space-y-1">
                              <p className="font-medium text-slate-800">
                                Upgradeable: {config.storage?.status === 'yes' ? '✅ Yes' : '❌ No'}
                              </p>
                              {config.storage?.options && (
                                <p className="text-sm text-slate-600">
                                  Slots: {config.storage.options.length} available
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 border-dashed text-center py-10">
                <p className="text-slate-500">No results found for "{searchQuery}". Try another model.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 border-dashed">
            <div className="text-center py-10">
              <div className="text-slate-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <p className="text-slate-500">Laptop specification results will appear here.</p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
