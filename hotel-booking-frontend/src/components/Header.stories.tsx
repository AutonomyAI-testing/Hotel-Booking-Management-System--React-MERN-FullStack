import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext, type AppContext as AppContextType } from "../contexts/AppContext";
import { SearchContext, type SearchContext as SearchContextType } from "../contexts/SearchContext";
import Header from "./Header";

// Create a QueryClient for stories
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock SearchContext values
const mockSearchContext: SearchContextType = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  hotelId: "",
  saveSearchValues: () => {},
  clearSearchValues: () => {},
};

// Mock AppContext for logged-out state
const mockAppContextLoggedOut: AppContextType = {
  isLoggedIn: false,
  showToast: () => {},
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: "",
};

// Mock AppContext for logged-in state
const mockAppContextLoggedIn: AppContextType = {
  isLoggedIn: true,
  showToast: () => {},
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: "",
};

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SearchContext.Provider value={mockSearchContext}>
            <Story />
          </SearchContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

/**
 * Logged out state - Shows the MernHolidays logo and a "Sign In" button.
 * This is the default view for unauthenticated users.
 */
export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

/**
 * Logged in state - Shows the full navigation menu with:
 * - Analytics
 * - My Bookings
 * - My Hotels
 * - API Docs
 * - API Status
 * - Sign Out dropdown
 */
export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedIn}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

/**
 * Mobile view - Logged in state at mobile breakpoint (375px width).
 * Shows the hamburger menu button for responsive navigation.
 */
export const MobileLoggedIn: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedIn}>
        <div style={{ width: "375px", margin: "0 auto" }}>
          <Story />
        </div>
      </AppContext.Provider>
    ),
  ],
};

/**
 * Mobile view - Logged out state at mobile breakpoint (375px width).
 * Shows the hamburger menu button and Sign In link.
 */
export const MobileLoggedOut: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <div style={{ width: "375px", margin: "0 auto" }}>
          <Story />
        </div>
      </AppContext.Provider>
    ),
  ],
};
