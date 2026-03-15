import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { SearchContext, type SearchContext as SearchContextType } from "../contexts/SearchContext";
import Hero from "./Hero";

const mockSearchContext: SearchContextType = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 2,
  childCount: 0,
  hotelId: "",
  saveSearchValues: () => {},
  clearSearchValues: () => {},
};

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <SearchContext.Provider value={mockSearchContext}>
          <Story />
        </SearchContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    onSearch: (searchData) => console.log("Search:", searchData),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    onSearch: (searchData) => console.log("Search:", searchData),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "375px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};
