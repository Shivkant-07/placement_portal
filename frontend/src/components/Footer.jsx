import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-8 bg-slate-900 text-white text-center mt-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <p className="font-semibold text-sm md:text-base">
          © {new Date().getFullYear()} Placement Portal. All rights reserved.
        </p>
        <p className="text-blue-300 text-xs md:text-sm mt-2">
          Developed for smooth recruitment management.
        </p>
      </div>
    </footer>
  );
}

export default Footer;