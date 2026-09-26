export default function CheckerPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 1. Hero Section */}
        <div className="text-center space-y-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Laptop Upgrade Checker
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Stop guessing before buying PC parts. Search your laptop model to check its maximum RAM and SSD upgrade limits.
          </p>
        </div>

        {/* 2. Search Box */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3">
            Enter Laptop Model
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              id="search"
              type="text"
              placeholder="e.g., ThinkPad T480, ROG Zephyrus..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-semibold transition-colors shadow-sm">
              Search
            </button>
          </div>
        </div>

        {/* 3. Placeholder Result Card */}
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

      </div>
    </main>
  );
}
