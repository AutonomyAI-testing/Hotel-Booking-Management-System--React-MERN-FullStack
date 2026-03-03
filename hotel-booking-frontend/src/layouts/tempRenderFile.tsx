/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

const LayoutRender = () => {
  return (
    <MemoryRouter initialEntries={["/search"]}>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Sample Page Content
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <p className="text-gray-700">
              This demonstrates the Layout component wrapping page content. The
              Layout includes the Header with navigation and the Footer with
              company information.
            </p>
            <p className="text-gray-600">
              The layout automatically adjusts padding based on the current
              route - the homepage has different styling compared to other
              pages.
            </p>
          </div>
        </div>
      </Layout>
    </MemoryRouter>
  );
};

export default LayoutRender;
