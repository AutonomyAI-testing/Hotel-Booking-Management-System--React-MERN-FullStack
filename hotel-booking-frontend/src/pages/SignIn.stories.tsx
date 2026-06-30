import type { Meta, StoryObj } from "@storybook/react-vite";
import SignIn from "./SignIn";

const meta: Meta<typeof SignIn> = {
  title: "Pages/SignIn",
  component: SignIn,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {};
