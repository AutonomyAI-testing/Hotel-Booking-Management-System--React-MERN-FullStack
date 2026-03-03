/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import Hero from "./Hero";

const HeroRenderExample = () => {
  const handleSearch = (searchData: any) => {
    console.log("Search initiated with:", searchData);
    // In a real application, this would trigger a navigation to search results
    // or update the search context with the new search parameters
  };

  return <Hero onSearch={handleSearch} />;
};

export default HeroRenderExample;
