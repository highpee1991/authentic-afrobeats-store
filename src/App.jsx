import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AfricanWearsAndFashion from "./components/pages/categories/AfricanWearsAndFashion";
import BeautyAndHouseHold from "./components/pages/categories/BeautyAndHouseHold";
import Condiments from "./components/pages/categories/Condiments";
import DrinkAndBeverages from "./components/pages/categories/DrinkAndBeverages";
import FruitsAndVegetables from "./components/pages/categories/FruitsAndVegetables";
import GrainFlourAndCereal from "./components/pages/categories/GrainFlourAndCereal";
import MeatAndSeafood from "./components/pages/categories/MeatAndSeafood";
import Others from "./components/pages/categories/Others";
import SnacksAndConfectionaries from "./components/pages/categories/SnacksAndConfectionaries";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Contact from "./components/pages/Contact";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./assets/styles/GlobalStyles";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import Layout from "./components/layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./components/ui/shared/productPage/ProductDetails";
import BlogDetails from "./components/ui/blog/BlogDetails";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles inititalIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to='home' />} />
            <Route path='home' element={<Home />} />
            <Route
              path='africanwearandfashion'
              element={<AfricanWearsAndFashion />}
            />
            <Route path='beautyandhousehold' element={<BeautyAndHouseHold />} />
            <Route path='condiments' element={<Condiments />} />
            <Route path='drinkandbeverages' element={<DrinkAndBeverages />} />
            <Route
              path='fruitsandvegetables'
              element={<FruitsAndVegetables />}
            />
            <Route
              path='grainflourandcereal'
              element={<GrainFlourAndCereal />}
            />
            <Route path='meatandseafood' element={<MeatAndSeafood />} />
            <Route path='others' element={<Others />} />
            <Route
              path='snacksandconfectionaries'
              element={<SnacksAndConfectionaries />}
            />
            <Route path='about' element={<About />} />
            <Route path='blog' element={<Blog />} />
            <Route path='contact' element={<Contact />} />
            <Route path='products/:productId' element={<ProductDetails />} />
            <Route path='blogs/:blogId' element={<BlogDetails />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
