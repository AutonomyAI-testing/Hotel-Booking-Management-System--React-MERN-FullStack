import { Link } from "react-router-dom";
import { FileText, Activity, BarChart3, Calendar, Building2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BusinessToolsDropdownProps {
  isDesktop?: boolean;
  onItemClick?: () => void;
}

const BusinessToolsDropdown = ({ isDesktop = true, onItemClick }: BusinessToolsDropdownProps) => {
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  if (!isDesktop) {
    // Mobile version: Return a list of items without dropdown wrapper
    // This is handled by MobileMenu component
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group">
          <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Business Tools
          <ChevronDown className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="start">
        <Link to="/analytics">
          <DropdownMenuItem onClick={handleItemClick} className="text-gray-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </DropdownMenuItem>
        </Link>

        <Link to="/my-bookings">
          <DropdownMenuItem onClick={handleItemClick} className="text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </DropdownMenuItem>
        </Link>

        <Link to="/my-hotels">
          <DropdownMenuItem onClick={handleItemClick} className="text-gray-700">
            <Building2 className="w-4 h-4 mr-2" />
            My Hotels
          </DropdownMenuItem>
        </Link>

        <Link to="/api-docs">
          <DropdownMenuItem onClick={handleItemClick} className="text-gray-700">
            <FileText className="w-4 h-4 mr-2" />
            API Docs
          </DropdownMenuItem>
        </Link>

        <Link to="/api-status">
          <DropdownMenuItem onClick={handleItemClick} className="text-gray-700">
            <Activity className="w-4 h-4 mr-2" />
            API Status
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BusinessToolsDropdown;
