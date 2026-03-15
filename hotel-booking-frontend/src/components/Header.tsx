import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useSearchContext from "../hooks/useSearchContext";
import SignOutButton from "./SignOutButton";
import {
  FileText,
  Activity,
  BarChart3,
  Building2,
  Calendar,
  LogIn,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    // Clear search context when going to home page
    search.clearSearchValues();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-large sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 group flex-shrink-0"
              aria-label="MernHolidays Home"
            >
              <div className="bg-white p-2 rounded-lg shadow-soft group-hover:shadow-medium transition-all duration-300">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-primary-100 transition-colors hidden sm:inline">
                MernHolidays
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {isLoggedIn ? (
                <>
                  {/* Analytics Dashboard Link */}
                  <Link
                    className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                    to="/analytics"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Analytics
                  </Link>

                  <Link
                    className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                    to="/my-bookings"
                  >
                    <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    My Bookings
                  </Link>
                  <Link
                    className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                    to="/my-hotels"
                  >
                    <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    My Hotels
                  </Link>

                  {/* API Documentation Link */}
                  <Link
                    className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                    to="/api-docs"
                  >
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    API Docs
                  </Link>

                  {/* API Status Link */}
                  <Link
                    className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                    to="/api-status"
                  >
                    <Activity className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    API Status
                  </Link>

                  <SignOutButton />
                </>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 hover:shadow-medium transition-all duration-200 group"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-white/10">
              <nav className="flex flex-col space-y-2 pt-4">
                {isLoggedIn ? (
                  <>
                    {/* Analytics Dashboard Link */}
                    <Link
                      onClick={closeMobileMenu}
                      className="flex items-center text-white/90 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                      to="/analytics"
                    >
                      <BarChart3 className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                      Analytics
                    </Link>

                    <Link
                      onClick={closeMobileMenu}
                      className="flex items-center text-white/90 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                      to="/my-bookings"
                    >
                      <Calendar className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                      My Bookings
                    </Link>

                    <Link
                      onClick={closeMobileMenu}
                      className="flex items-center text-white/90 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                      to="/my-hotels"
                    >
                      <Building2 className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                      My Hotels
                    </Link>

                    {/* API Documentation Link */}
                    <Link
                      onClick={closeMobileMenu}
                      className="flex items-center text-white/90 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                      to="/api-docs"
                    >
                      <FileText className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                      API Docs
                    </Link>

                    {/* API Status Link */}
                    <Link
                      onClick={closeMobileMenu}
                      className="flex items-center text-white/90 hover:text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group"
                      to="/api-status"
                    >
                      <Activity className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                      API Status
                    </Link>

                    <div className="pt-2 border-t border-white/10">
                      <SignOutButton />
                    </div>
                  </>
                ) : (
                  <Link
                    onClick={closeMobileMenu}
                    to="/sign-in"
                    className="flex items-center justify-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 group w-full"
                  >
                    <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
