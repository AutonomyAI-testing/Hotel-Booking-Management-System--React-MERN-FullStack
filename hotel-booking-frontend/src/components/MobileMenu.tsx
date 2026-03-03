import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronDown, BarChart3, Calendar, Building2, FileText, Activity, LogIn } from "lucide-react";
import useAppContext from "../hooks/useAppContext";
import useSearchContext from "../hooks/useSearchContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  
  // State for expandable dropdowns within mobile menu
  const [expandedBusinessTools, setExpandedBusinessTools] = useState(false);

  const handleLogoClick = () => {
    search.clearSearchValues();
    navigate("/");
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Full-screen mobile menu */}
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 group"
          >
            <div className="bg-primary-600 p-2 rounded-lg shadow-soft">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-600 tracking-tight">
              MernHolidays
            </span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col p-4 space-y-2">
          {isLoggedIn ? (
            <>
              {/* Business Tools Dropdown */}
              <div>
                <button
                  onClick={() => setExpandedBusinessTools(!expandedBusinessTools)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-primary-600 font-medium hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 mr-3" />
                    Business Tools
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedBusinessTools ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Business Tools submenu */}
                {expandedBusinessTools && (
                  <div className="flex flex-col space-y-1 pl-4 mt-1">
                    <Link to="/analytics" onClick={handleNavClick}>
                      <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <BarChart3 className="w-4 h-4 mr-3" />
                        Analytics
                      </button>
                    </Link>

                    <Link to="/my-bookings" onClick={handleNavClick}>
                      <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Calendar className="w-4 h-4 mr-3" />
                        My Bookings
                      </button>
                    </Link>

                    <Link to="/my-hotels" onClick={handleNavClick}>
                      <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Building2 className="w-4 h-4 mr-3" />
                        My Hotels
                      </button>
                    </Link>

                    <Link to="/api-docs" onClick={handleNavClick}>
                      <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <FileText className="w-4 h-4 mr-3" />
                        API Docs
                      </button>
                    </Link>

                    <Link to="/api-status" onClick={handleNavClick}>
                      <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Activity className="w-4 h-4 mr-3" />
                        API Status
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sign Out Button - positioned at bottom */}
              <div className="fixed bottom-4 left-4 right-4">
                <button
                  onClick={() => {
                    // Sign out logic will be handled by the button component
                    handleNavClick();
                  }}
                  className="w-full flex items-center justify-center bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Sign In Link for logged out users */}
              <Link to="/sign-in" onClick={handleNavClick}>
                <button className="flex items-center w-full px-4 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-200">
                  <LogIn className="w-5 h-5 mr-3" />
                  Sign In
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
