import type { Meta, StoryObj } from "@storybook/react";
import IconTest from "./IconTest";

const meta: Meta<typeof IconTest> = {
  title: "Components/IconTest",
  component: IconTest,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof IconTest>;

export const Default: Story = {};
