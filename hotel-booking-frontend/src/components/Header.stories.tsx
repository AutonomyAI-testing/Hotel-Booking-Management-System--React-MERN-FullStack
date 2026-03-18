import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './Header';
import { AppContext } from '../contexts/AppContext';
import { SearchContext } from '../contexts/SearchContext';

// Create a mock QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock AppContext value
const mockAppContextLoggedOut = {
  showToast: () => {},
  isLoggedIn: false,
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: '',
};

const mockAppContextLoggedIn = {
  ...mockAppContextLoggedOut,
  isLoggedIn: true,
};

// Mock SearchContext value
const mockSearchContext = {
  destination: '',
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  hotelId: '',
  saveSearchValues: () => {},
  clearSearchValues: () => {},
};

// Decorator to wrap with all required providers
const withProviders = (isLoggedIn: boolean) => (Story: React.ComponentType) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContext.Provider value={isLoggedIn ? mockAppContextLoggedIn : mockAppContextLoggedOut}>
        <SearchContext.Provider value={mockSearchContext}>
          <Story />
        </SearchContext.Provider>
      </AppContext.Provider>
    </BrowserRouter>
  </QueryClientProvider>
);

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  decorators: [withProviders(false)],
};

export const LoggedIn: Story = {
  decorators: [withProviders(true)],
};
