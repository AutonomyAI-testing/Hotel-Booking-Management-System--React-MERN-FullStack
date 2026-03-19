import * as React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export interface DropdownOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  onSelect: (value: string | number) => void;
  selectedValue?: string | number;
  placeholder?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  showSelectedIcon?: boolean;
  trigger?: React.ReactNode;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      label,
      options,
      onSelect,
      selectedValue,
      placeholder = "Select an option",
      className,
      variant = "outline",
      size = "default",
      disabled = false,
      showSelectedIcon = false,
      trigger,
    },
    ref
  ) => {
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const displayText = selectedOption?.label || placeholder;

    const handleSelect = (value: string | number) => {
      onSelect(value);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {trigger ? (
            <div onClick={(e) => !disabled && e.currentTarget.click()}>
              {trigger}
            </div>
          ) : (
            <Button
              ref={ref}
              variant={variant}
              size={size}
              disabled={disabled}
              className={cn("w-full justify-between", className)}
            >
              <span className="truncate">{displayText}</span>
              <ChevronDown className="h-4 w-4 ml-2 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
          {label && <DropdownMenuSeparator />}
          {options.map((option, index) => {
            if (option.divider) {
              return <DropdownMenuSeparator key={`divider-${index}`} />;
            }

            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSelect(option.value)}
                disabled={option.disabled}
                className={cn(
                  "cursor-pointer",
                  selectedValue === option.value && "bg-accent text-accent-foreground"
                )}
              >
                {option.icon && (
                  <span className="mr-2 h-4 w-4">{option.icon}</span>
                )}
                <span className="flex-1">{option.label}</span>
                {showSelectedIcon && selectedValue === option.value && (
                  <span className="ml-2 text-primary-600">✓</span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };

