import { useEffect, useState } from "react"

export default function SearchInput() {

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if(debouncedTerm) {
      alert('API CALL');
    }
  }, [debouncedTerm]);

  return (
    <div className="relative w-full max-w-md">
      <input
        onChange={e => setSearchTerm(e.currentTarget.value)}
        type="text"
        placeholder="Search"
        className="w-full rounded-lg border-2 border-gray-300 bg-white py-2 px-4 text-base transition-colors hover:border-gray-400 focus:border-blue-500 focus:bg-blue-50 focus:outline-none"
      />
      <svg
        className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}