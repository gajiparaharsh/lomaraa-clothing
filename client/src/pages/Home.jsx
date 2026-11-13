import React from "react";
import Hero from "../components/home/Hero";
import NewArrivals from "../components/home/NewArrivals";
import Collections from "../components/home/Collections";
import BestSellers from "../components/home/BestSellers";
import EditorialBanner from "../components/home/EditorialBanner";
import BrandStory from "../components/home/BrandStory";
import Newsletter from "../components/home/Newsletter";

export const Home = () => {
  return (
    <main className="w-full overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Shop By Collection */}
      <Collections />

      {/* Best Sellers */}
      <BestSellers />

      {/* Editorial Banner: "LESS, BUT BETTER." */}
      <EditorialBanner />

      {/* Brand Story: "THE ART OF EVERYDAY STYLE." */}
      <BrandStory />

      {/* Newsletter: "JOIN THE LOMARAA WORLD." */}
      <Newsletter />
    </main>
  );
};

export default Home;

