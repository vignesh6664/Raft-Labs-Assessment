import { useState } from "react";
import { Link } from "react-router-dom"

interface NavigationProps{
    onLogout:()=> void
}

const Navigation:React.FC<NavigationProps> = ({onLogout: onlogout}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  const toggleMenuClose=()=>{
    setIsMenuOpen(false)
  }
  return (

  <nav className="flex justify-between items-center p-4 bg-gray-800">
      <div className="logo">
        <h4 className="text-white font-serif uppercase">Global News</h4>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-sm md:space-x-10">
        <li className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          <Link to="/feeds" >Feeds</Link>
        </li>
        <li className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          <Link to="/create-feed" >Create Feed</Link>
        </li>
        <li>
          <button
            onClick={onlogout} // Call the onLogout function passed from App.tsx
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 p-4 space-y-4 text-white text-sm">
          <li className="hover:bg-gray-700 px-3 py-2 rounded">
            <Link to="/feeds" onClick={toggleMenuClose}>Feeds</Link>
          </li>
          <li className="hover:bg-gray-700 px-3 py-2 rounded">
            <Link to="/create-feed" onClick={toggleMenuClose}>Create Feed</Link>
          </li>
          <li>
            <button
              onClick={onlogout} // Call the onLogout function passed from App.tsx
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navigation