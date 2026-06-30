import type { Preview } from "@storybook/react-vite";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../src/contexts/AppContext";
import { Toaster } from "../src/components/ui/toaster";
import "../src/index.css";

const mockAppContext = {
  showToast: () => {},
  isLoggedIn: false,
  stripePromise: Promise.resolve(null),
  showGlobalLoading: () => {},
  hideGlobalLoading: () => {},
  isGlobalLoading: false,
  globalLoadingMessage: "",
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: 0 } },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <AppContext.Provider value={mockAppContext}>
            <MemoryRouter>
              <Story />
              <Toaster />
            </MemoryRouter>
          </AppContext.Provider>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
