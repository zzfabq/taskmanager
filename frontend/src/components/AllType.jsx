import React from 'react';

const AllType = () => {
  return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {/* Home Icon using SVG */}
//       <div className="mb-4">
//         <svg 
//           className="w-16 h-16 text-blue-600" 
//           fill="currentColor" 
//           viewBox="0 0 24 24"
//           aria-label="home"
//         >
//           <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//         </svg>
//       </div>
//       <h1 className="text-2xl font-bold text-gray-800">
//         Welcome to Task Manager
//       </h1>
//       <p className="text-gray-600 mt-2">
//         Organize your tasks efficiently
//       </p>
//     </div>
//   );
  
    <div className="relative w-32 h-[58px] bg-[#f9f9f9] border border-[#e6e6e6] rounded-l-[5px] overflow-hidden">
      <span className="absolute top-1/2 left-[23px] -translate-y-1/2 text-[14px] font-medium text-[#252b42] leading-[28px] font-[Poppins]">
        All Type
      </span>
      <svg
        className="absolute top-1/2 right-4 w-[10px] h-[5.71px] transform -translate-y-1/2 rotate-90 fill-[#252b42]"
        viewBox="0 0 10 11.428571"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow"
      >
        <path d="M0 8.57143 L3.57143 5 L0 1.42857 L0.714286 0 L5.71429 5 L0.714286 10 L0 8.57143 Z" />
      </svg>
    </div>
  );
};

export default AllType;
