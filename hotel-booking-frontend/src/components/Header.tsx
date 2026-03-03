import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useSearchContext from "../hooks/useSearchContext";
import UserProfileDropdown from "./UserProfileDropdown";
import BusinessToolsDropdown from "./BusinessToolsDropdown";
import MobileMenu from "./MobileMenu";
import { Building2, Menu, LogIn } from "lucide-react";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    // Clear search context when going to home page
    search.clearSearchValues();
    navigate("/");
  };

  return (
    <>
      {/* Development Banner */}
      {/* {!import.meta.env.PROD && (
        <div className="bg-yellow-500 text-black text-center py-1 text-xs font-medium">
          🚧 Development Mode - Auth state persists between sessions
        </div>
      )} */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-large sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 group"
            >
              <div className="bg-white p-2 rounded-lg shadow-soft group-hover:shadow-medium transition-all duration-300">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-primary-100 transition-colors">
                MernHolidays
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {isLoggedIn ? (
                <>
                  <BusinessToolsDropdown />
                  <UserProfileDropdown />
                </>
              ) : (
                <button
                  onClick={() => navigate("/sign-in")}
                  className="flex items-center bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 hover:shadow-medium transition-all duration-200 group"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Sign In
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
