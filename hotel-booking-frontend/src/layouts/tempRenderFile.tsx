/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import Layout from "./Layout";

const LayoutExample = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Hotel Booking Platform
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          This is an example page wrapped in the Layout component. The Layout
          provides consistent structure with a header at the top and footer at
          the bottom, while the content area adjusts based on the current route.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">
            About the Layout
          </h2>
          <p className="text-blue-800">
            The Layout component wraps all pages in the application, ensuring a
            consistent look and feel. It includes the navigation header and
            footer, and applies different padding styles depending on whether
            you're on the homepage or other pages.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Header Section
            </h3>
            <p className="text-gray-600">
              Contains the site logo, navigation links, and authentication
              buttons.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Footer Section
            </h3>
            <p className="text-gray-600">
              Includes company information, quick links, support resources, and
              contact details.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutExample;
