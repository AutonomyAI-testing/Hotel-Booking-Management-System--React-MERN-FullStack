import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";
import { User, Settings, LogOut, CreditCard, HelpCircle } from "lucide-react";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSelect: { action: "selected" },
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const accountOptions = [
  { label: "Profile", value: "profile", icon: <User className="h-4 w-4" /> },
  { label: "Settings", value: "settings", icon: <Settings className="h-4 w-4" /> },
  { label: "Billing", value: "billing", icon: <CreditCard className="h-4 w-4" /> },
  { divider: true, label: "", value: "divider1" },
  { label: "Help", value: "help", icon: <HelpCircle className="h-4 w-4" /> },
  { divider: true, label: "", value: "divider2" },
  { label: "Sign Out", value: "signout", icon: <LogOut className="h-4 w-4" /> },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: "Select an option",
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const WithLabel: Story = {
  args: {
    label: "Settings Menu",
    options: basicOptions,
    placeholder: "Choose setting",
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const WithSelectedValue: Story = {
  args: {
    options: basicOptions,
    selectedValue: "option2",
    showSelectedIcon: true,
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const WithIcons: Story = {
  args: {
    label: "Account",
    options: accountOptions,
    placeholder: "Account options",
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const GhostVariant: Story = {
  args: {
    options: basicOptions,
    placeholder: "Ghost dropdown",
    variant: "ghost",
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const SmallSize: Story = {
  args: {
    options: basicOptions,
    placeholder: "Small dropdown",
    size: "sm",
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const LargeSize: Story = {
  args: {
    options: basicOptions,
    placeholder: "Large dropdown",
    size: "lg",
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: "Disabled dropdown",
    disabled: true,
    onSelect: (value) => console.log("Selected:", value),
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { label: "Available Option", value: "available" },
      { label: "Disabled Option", value: "disabled", disabled: true },
      { label: "Another Available", value: "another" },
    ],
    placeholder: "Select an option",
    onSelect: (value) => console.log("Selected:", value),
  },
};
