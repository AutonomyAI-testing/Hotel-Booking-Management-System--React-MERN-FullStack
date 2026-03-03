/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import Layout from "../layouts/Layout";
import Home from "../pages/Home";

/**
 * Render file for Header component
 * 
 * The Header component is integrated into the Layout component and is visible on all pages.
 * This render file demonstrates the header in the context of the home page with full layout.
 * 
 * The Header component:
 * - Displays the MernHolidays logo and brand
 * - Shows sign-in button for logged-out users
 * - Shows business tools dropdown and user profile dropdown for logged-in users
 * - Includes mobile menu button for responsive navigation
 * - Uses existing AppContext (for auth state) and SearchContext (for clearing search on logo click)
 * 
 * All required providers (QueryClientProvider, AppContextProvider, SearchContextProvider, BrowserRouter)
 * are already configured at the app root level.
 */
const HeaderRender = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HeaderRender;
