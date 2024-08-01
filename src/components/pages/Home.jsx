import React from "react";
import Hero from "../ui/Hero";
import ShopQualityProduct from "../ui/ShopQualityProduct";
import styled from "styled-components";
import WearsCatPreview from "../ui/catPreview/WearsCatPreview";
import BestOffers from "../ui/bestOffers/BestOffers";
import StoreLocation from "../ui/storeLocation/StoreLocation";
import Testimonials from "../ui/testimonials/Testimonails";
import BlogPreview from "../ui/catPreview/BlogPreviewDisplay";
import BlogPreviewDisplay from "../ui/catPreview/BlogPreviewDisplay";

const PageContainer = styled.div`
  /* height: 100vh; */
`;

const Home = () => {
  return (
    <PageContainer>
      <Hero />
      <ShopQualityProduct />
      <WearsCatPreview />
      <BestOffers />
      <StoreLocation />
      <Testimonials />
      <BlogPreviewDisplay />
    </PageContainer>
  );
};

export default Home;
