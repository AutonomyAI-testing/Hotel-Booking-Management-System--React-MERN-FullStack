import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContext, type AppContext as AppContextType } from '../contexts/AppContext';
import { SearchContext, type SearchContext as SearchContextType } from '../contexts/SearchContext';
import Header from './Header';

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
  destination: '',
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  hotelId: '',
  saveSearchValues: () => {},
  clearSearchValues: () => {},
};

// Mock AppContext for logged out state
const mockAppContextLoggedOut: AppContextType = {
  isLoggedIn: false,
  showToast: () => {},
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: '',
};

// Mock AppContext for logged in state
const mockAppContextLoggedIn: AppContextType = {
  isLoggedIn: true,
  showToast: () => {},
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: '',
};

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
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

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedOut}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <AppContext.Provider value={mockAppContextLoggedIn}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};
