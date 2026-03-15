import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from './Footer';
import WaveDivider from './WaveDivider';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

// Default story showing just the Footer
export const Default: Story = {};

// Story showing Footer with WaveDivider above it
export const WithWaveDivider: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      {/* Mock content area to show the wave transition */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Stay
          </h1>
          <p className="text-gray-600 mb-6">
            Find amazing hotels and accommodations worldwide. Whether you're planning a relaxing 
            beach vacation, an exciting city adventure, or a peaceful mountain retreat, we have 
            the perfect place for you.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-lg">5000+</h3>
              <p className="text-gray-500 text-sm">Hotels</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-lg">100+</h3>
              <p className="text-gray-500 text-sm">Countries</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-lg">1M+</h3>
              <p className="text-gray-500 text-sm">Happy Guests</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider transitioning from content to footer */}
      <WaveDivider />
      
      {/* Footer component */}
      <Footer />
    </div>
  ),
};
