/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import Hero from "./Hero";

const HeroRender = () => {
  const handleSearch = (searchData: any) => {
    console.log("Search initiated with:", searchData);
  };

  return <Hero onSearch={handleSearch} />;
};

export default HeroRender;
