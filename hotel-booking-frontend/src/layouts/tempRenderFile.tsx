/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

const LayoutRender = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to MernHolidays
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              This is a demonstration of the Layout component which wraps page
              content with a consistent header and footer structure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">
                  Flexible Layout
                </h3>
                <p className="text-gray-600">
                  Adapts to different page types with conditional padding and
                  styling.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">
                  Consistent Header
                </h3>
                <p className="text-gray-600">
                  Navigation and branding consistent across all pages.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">
                  Footer Section
                </h3>
                <p className="text-gray-600">
                  Contact information and links always accessible at the
                  bottom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </MemoryRouter>
  );
};

export default LayoutRender;
