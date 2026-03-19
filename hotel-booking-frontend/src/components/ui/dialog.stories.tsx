import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./dialog";

const meta: Meta<typeof DialogContent> = {
  title: "UI/DialogContent",
  component: DialogContent,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Dialog open={true}>
        <Story />
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {
  render: () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog description. It provides additional context about the
          dialog content.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm text-muted-foreground">
          This is the main content area of the dialog. You can place any content
          here.
        </p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
        </DialogClose>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Confirm
        </button>
      </DialogFooter>
    </DialogContent>
  ),
};

export const WithForm: Story = {
  render: () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            defaultValue="John Doe"
            className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            defaultValue="john@example.com"
            className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>
      <DialogFooter>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Save changes
        </button>
      </DialogFooter>
    </DialogContent>
  ),
};

export const AlertDialog: Story = {
  render: () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
        </DialogClose>
        <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
          Delete Account
        </button>
      </DialogFooter>
    </DialogContent>
  ),
};

export const WithTrigger: Story = {
  decorators: [
    (Story) => (
      <Dialog>
        <Story />
      </Dialog>
    ),
  ],
  render: () => (
    <>
      <DialogTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Open Dialog
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Interactive Dialog</DialogTitle>
          <DialogDescription>
            Click the button to open this dialog. Click outside or press Escape
            to close.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This dialog can be opened and closed interactively.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  ),
};
