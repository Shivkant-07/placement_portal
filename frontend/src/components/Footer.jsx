import React from 'react';

function Footer() {
  return (
    // bg-slate-900 navbar ka color hai, tumhara jo bhi exact blue shade hai wo yahan daal do
    <footer className="mt-auto py-8 bg-slate-900 text-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <p className="font-semibold">
          © {new Date().getFullYear()} Placement Portal. All rights reserved.
        </p>
        <p className="text-blue-200 text-sm mt-1">
          Developed for smooth recruitment management.
        </p>
      </div>
    </footer>
  );
}



// Yeh line hona bahut zaroori hai!
export default Footer;