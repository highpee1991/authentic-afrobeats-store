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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./assets/styles/GlobalStyles";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import Layout from "./components/layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BlogDetails from "./components/ui/blog/BlogDetails";
import Cart from "./components/ui/cart/Cart";
import { WearsProductdetail } from "./components/ui/shared/productdetails/AllProductDetails";
import Checkout from "./components/ui/checkout/CheckoutPage";
import Auth from "./components/authentication/Auth";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  const handleInitialRedirect = () => {
    // Skip the redirect if there's a hash in the URL (likely from an auth callback)
    if (!window.location.hash) {
      return <Navigate replace to='home' />;
    }
    return null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles inititalIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={handleInitialRedirect()} />
            <Route path='home' element={<Home />} />
            <Route path='auth' element={<Auth />} />
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
            <Route
              path='products/:productId'
              element={<WearsProductdetail />}
            />
            <Route path='blogs/:blogId' element={<BlogDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
