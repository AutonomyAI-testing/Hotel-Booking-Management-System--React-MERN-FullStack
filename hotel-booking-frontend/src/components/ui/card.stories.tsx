import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can add any content.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px] p-6">
      <p>A simple card with just content and padding.</p>
    </Card>
  ),
};

export const WithHeaderOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Header Only</CardTitle>
        <CardDescription>
          This card only has a header section.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const BookingCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Hotel Booking</CardTitle>
        <CardDescription>
          Complete your reservation details below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Check-in:</span>
          <span>Dec 15, 2024</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Check-out:</span>
          <span>Dec 20, 2024</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Guests:</span>
          <span>2 Adults</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="font-semibold">Total:</span>
        <span className="font-bold text-lg">$599.00</span>
      </CardFooter>
    </Card>
  ),
};
