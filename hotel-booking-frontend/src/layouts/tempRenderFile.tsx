/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import Layout from "./Layout";

const LayoutRender = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to MernHolidays
          </h1>
          <p className="text-gray-600 mb-6">
            This is a demonstration of the Layout component. It wraps page
            content with a consistent header and footer across the application.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-700 mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600 text-sm">
                The layout adapts seamlessly to different screen sizes and
                devices.
              </p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-700 mb-2">
                Route-Aware Styling
              </h3>
              <p className="text-gray-600 text-sm">
                The layout adjusts padding and container width based on the
                current route.
              </p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-700 mb-2">
                Consistent Navigation
              </h3>
              <p className="text-gray-600 text-sm">
                Header and footer remain consistent across all pages using this
                layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutRender;
