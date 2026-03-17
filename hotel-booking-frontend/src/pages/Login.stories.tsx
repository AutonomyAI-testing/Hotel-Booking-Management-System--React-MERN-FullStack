import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext, type AppContext as AppContextType } from "../contexts/AppContext";
import AuthLayout from "../layouts/AuthLayout";
import Login from "./Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

const mockAppContext: AppContextType = {
  isLoggedIn: false,
  showToast: () => {},
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: "",
};

const meta: Meta<typeof Login> = {
  title: "Pages/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppContext.Provider value={mockAppContext}>
            <AuthLayout>
              <Story />
            </AuthLayout>
          </AppContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Login>;

// Default desktop view with full layout including avatar section
export const Default: Story = {};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
