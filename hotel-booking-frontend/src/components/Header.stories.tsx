import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext, type AppContext as AppContextType } from "../contexts/AppContext";
import { SearchContext, type SearchContext as SearchContextType } from "../contexts/SearchContext";
import Header from "./Header";
import { LogIn, Loader2 } from "lucide-react";

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
 * Desktop Sign In Button - Default state showing the LogIn icon with 'Sign In' text.
 * This is the default view for unauthenticated users on desktop.
 */
export const DesktopSignInDefault: Story = {
  name: "Desktop - Sign In (Default)",
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

/**
 * Desktop Sign In Button - Loading state showing a spinning Loader2 icon with 'Loading...' text.
 * This state appears after clicking the Sign In button.
 */
export const DesktopSignInLoading: Story = {
  name: "Desktop - Sign In (Loading)",
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <div>
          {/* Mock header with loading state - simulated button */}
          <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-large sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2 group flex-shrink-0">
                  <div className="bg-white p-2 rounded-lg shadow-soft">
                    <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                      <path d="M10 6h4"/>
                      <path d="M10 10h4"/>
                      <path d="M10 14h4"/>
                      <path d="M10 18h4"/>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-red-500 tracking-tight hidden sm:inline">
                    MernHolidays
                  </span>
                </div>

                {/* Loading Sign In Button */}
                <nav className="hidden md:flex items-center space-x-1">
                  <button
                    disabled
                    className="flex items-center bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </button>
                </nav>
              </div>
            </div>
          </header>
        </div>
      </AppContext.Provider>
    ),
  ],
};

/**
 * Desktop Sign In Button - Hover state showing the button appearance when hovered.
 * The button has hover styles with bg-primary-50 and shadow-medium.
 */
export const DesktopSignInHover: Story = {
  name: "Desktop - Sign In (Hover)",
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <div>
          {/* Mock header with hover state - simulated button */}
          <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-large sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2 group flex-shrink-0">
                  <div className="bg-white p-2 rounded-lg shadow-soft">
                    <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                      <path d="M10 6h4"/>
                      <path d="M10 10h4"/>
                      <path d="M10 14h4"/>
                      <path d="M10 18h4"/>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-red-500 tracking-tight hidden sm:inline">
                    MernHolidays
                  </span>
                </div>

                {/* Hover State Sign In Button */}
                <nav className="hidden md:flex items-center space-x-1">
                  <button
                    className="flex items-center bg-primary-50 text-primary-600 px-6 py-2 rounded-lg font-semibold shadow-medium"
                  >
                    <LogIn className="w-4 h-4 mr-2 scale-110" />
                    Sign In
                  </button>
                </nav>
              </div>
            </div>
          </header>
        </div>
      </AppContext.Provider>
    ),
  ],
};

/**
 * Mobile Sign In Button - Default state showing the LogIn icon with 'Sign In' text.
 * This is the default view for unauthenticated users on mobile at 375px width.
 */
export const MobileSignInDefault: Story = {
  name: "Mobile - Sign In (Default)",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <div style={{ width: "375px", margin: "0 auto" }}>
          {/* Mobile header with menu open and Sign In button */}
          <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-large sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2 group flex-shrink-0">
                  <div className="bg-white p-2 rounded-lg shadow-soft">
                    <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                      <path d="M10 6h4"/>
                      <path d="M10 10h4"/>
                      <path d="M10 14h4"/>
                      <path d="M10 18h4"/>
                    </svg>
                  </div>
                </div>

                {/* Mobile Menu Button (X for open state) */}
                <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Open */}
              <div className="md:hidden pb-4 border-t border-white/10">
                <nav className="flex flex-col space-y-2 pt-4">
                  <button className="flex items-center justify-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                </nav>
              </div>
            </div>
          </header>
        </div>
      </AppContext.Provider>
    ),
  ],
};

/**
 * Mobile Sign In Button - Loading state showing a spinning Loader2 icon with 'Loading...' text.
 * This state appears after clicking the Sign In button on mobile.
 */
export const MobileSignInLoading: Story = {
  name: "Mobile - Sign In (Loading)",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <div style={{ width: "375px", margin: "0 auto" }}>
          {/* Mobile header with menu open and Loading button */}
          <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-large sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2 group flex-shrink-0">
                  <div className="bg-white p-2 rounded-lg shadow-soft">
                    <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                      <path d="M10 6h4"/>
                      <path d="M10 10h4"/>
                      <path d="M10 14h4"/>
                      <path d="M10 18h4"/>
                    </svg>
                  </div>
                </div>

                {/* Mobile Menu Button (X for open state) */}
                <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Open */}
              <div className="md:hidden pb-4 border-t border-white/10">
                <nav className="flex flex-col space-y-2 pt-4">
                  <button
                    disabled
                    className="flex items-center justify-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold w-full disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </button>
                </nav>
              </div>
            </div>
          </header>
        </div>
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
