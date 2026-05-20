export default function TimerCard() {
  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-3xl p-6 md:p-10 shadow-2xl shadow-indigo-100/80 border border-slate-100/50 transition-all duration-300">
        <div className="text-6xl md:text-7xl font-medium tracking-tight text-[#16008b] text-center my-6 md:my-8 tabular-nums select-none">
          45:00
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Main Action Button */}
          <button
            className="px-7 py-3.5 bg-[#16008b] text-white font-medium text-xs md:text-lg rounded-2xl shadow-lg shadow-black-200 hover:bg-[#1e05b1] hover:shadow-black-300 transition-all duration-200 cursor-pointer active:scale-95 text-center uppercase tracking-wide"
          >
            Démarrer
          </button>
          {/* Reset Button */}
          <button
            title="Redémarrer"
            className="p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:text-[#16008b] hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        <div className="text-center mt-10 select-none">
          <span className="text-lg md:text-xl font-medium text-[#16008b]">
            Il est temps de bosser !
          </span>
      </div>
    </div>
  )
}