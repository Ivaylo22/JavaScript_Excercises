import React, { useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { ContentWrapper } from "./Styled/Container";
import { GlobalStyle } from "./Styled/Global";
import InfoCard, { cocktailDetailsLoader } from "./components/InfoCard";


//pages
import Home from "./pages/Home"
import Favourites from "./pages/Favourites";
import RandomCocktail from "./pages/RandomCocktail";
import NotFound from "./pages/NotFound";
import Cocktails from "./pages/Cocktails";
import CocktailError from "./pages/CocktailError";


//layout
import RootLayout from "./layouts/RootLayout";

function App() {
  const [cocktails, setCocktails] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout
        setCocktails={setCocktails}
      />}>
        <Route
          index
          element={
            <Home
              setCocktails={setCocktails}
            />} >
        </Route>

        <Route
          path="cocktails"
          element={
            <Cocktails
              cocktails={cocktails}
              setCocktails={setCocktails} />}
          errorElement={<CocktailError />}>
        </Route>

        <Route
          path="favourites"
          element={
            <Favourites
              cocktails={cocktails}
              setCocktails={setCocktails} />}
          errorElement={<CocktailError />}>
        </Route>

        <Route
          path="random"
          element={
            <RandomCocktail
              setCocktails={setCocktails} />}
          errorElement={<CocktailError />}>
        </Route>

        <Route
          path="cocktails/:id"
          element={
            <InfoCard
              cocktails={cocktails}
              setCocktails={setCocktails} />}
          loader={cocktailDetailsLoader}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <ContentWrapper>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ContentWrapper>
  )
}

export default App
