import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-gray-800 text-white px-4 py-3'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='text-xl font-bold'>
          Flowchart App
        </Link>
        <div className='hidden md:flex gap-6'>
          <Link to='/' className='hover:text-gray-300'>
            Login
          </Link>
          <Link to='/flow' className='hover:text-gray-300'>
            Flowchart
          </Link>
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden mt-2 space-y-2 px-4'>
          <Link to='/' className='block hover:text-gray-300'>
            Login
          </Link>
          <Link to='/flow' className='block hover:text-gray-300'>
            Flowchart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
