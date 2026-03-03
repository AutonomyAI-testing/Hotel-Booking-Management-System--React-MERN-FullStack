import React from "react";
import { cn } from "../lib/utils";

interface UserAvatarProps {
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  className?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  firstName = "U",
  lastName = "S",
  email,
  className,
  onClick,
}) => {
  // Generate initials from firstName and lastName
  const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase() || "US";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-10 h-10 rounded-full border-2 border-blue-400 overflow-hidden flex-shrink-0 hover:border-blue-300 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",
        className
      )}
      title={email}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
          {initials}
        </div>
      )}
    </button>
  );
};

export default UserAvatar;
