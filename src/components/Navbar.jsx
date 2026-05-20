import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const leftLinks = [
    { name: 'Agence' },
    { name: 'Activités' },
    { name: 'Projets', active: true },
    { name: 'Actualités' }
  ];
  const rightLinks = ['Jobs', 'Marchés'];

  return (
    <nav className="fixed w-full top-0 bg-white px-4 lg:px-8 py-4 flex justify-center items-center">
      <ul className='w-full md:w-xl flex justify-between items-center font-medium'>
        <li className='text-[#16008b] p-2 text-xl font-medium italic'>
          Stand Up
        </li>
        <li className='bg-[#16008b] text-[15px] font-medium text-blue-100 rounded-full px-5 py-2.5 cursor-pointer hover:text-white hover:bg-[#1e05b1]'>
          Inscrivez vous
        </li>
      </ul>
      
      {/* Desktop View */}
      {/* <div className="hidden lg:flex items-center w-full">
        <div className="flex items-center space-x-2 text-[15px] font-semibold text-[#16008b]">
          {leftLinks.map((link) => (
            <div
              key={link.name}
              className={`flex items-center cursor-pointer px-5 py-2.5 transition-colors ${
                link.active ? 'bg-[#edeaf6] rounded-full' : 'hover:bg-[#edeaf6]/50 rounded-full'
              }`}
            >
              {link.name}
            </div>
          ))}
        </div>
        <div className="flex items-center ml-auto space-x-2 text-[15px] font-semibold text-[#16008b]">
           {rightLinks.map((link) => (
            <div key={link} className="cursor-pointer px-5 py-2.5 hover:bg-[#edeaf6]/50 rounded-full transition-colors">
              {link}
            </div>
          ))}
        </div>
      </div> */}

      {/* Mobile View Header */}
      {/* <div className="flex lg:hidden items-center justify-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#16008b] p-2 focus:outline-none hover:bg-[#edeaf6]/50 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div> */}

      {/* Mobile Menu Expanded */}
      {/* {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col space-y-2 text-[15px] font-semibold text-[#16008b]">
          {leftLinks.map((link) => (
            <div
              key={link.name}
              className={`cursor-pointer px-5 py-3 transition-colors ${
                link.active ? 'bg-[#edeaf6] rounded-xl' : 'hover:bg-[#edeaf6]/50 rounded-xl'
              }`}
            >
              {link.name}
            </div>
          ))}
          <div className="border-t border-indigo-100 my-2 mx-5"></div>
          {rightLinks.map((link) => (
            <div key={link} className="cursor-pointer px-5 py-3 hover:bg-[#edeaf6]/50 rounded-xl transition-colors">
              {link}
            </div>
          ))}
        </div>
      )} */}
    </nav>
  );
}

