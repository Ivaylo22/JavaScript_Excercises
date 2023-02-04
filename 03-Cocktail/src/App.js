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
import CocktailsLayout from "./layouts/CocktailsLayout";

const InfoRoute = ({ cocktails, setCocktails, loader }) => (
  <Route path=":id"
    element={<InfoCard cocktails={cocktails} setCocktails={setCocktails} />}
    loader={loader}
  />
)

function App() {
  const [cocktails, setCocktails] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout
        setCocktails={setCocktails}
      />}>
        <Route index element={<Home
          setCocktails={setCocktails}
        />} />

        <Route path="cocktails" element={<CocktailsLayout />} errorElement={<CocktailError />}>
          <Route
            index
            element={<Cocktails
              cocktails={cocktails}
              setCocktails={setCocktails} />}
          />

          {InfoRoute({ cocktails, setCocktails, loader: cocktailDetailsLoader })}
        </Route>

        <Route path="favourites" element={<CocktailsLayout />} errorElement={<CocktailError />}>
          <Route
            index
            element={<Favourites
              cocktails={cocktails}
              setCocktails={setCocktails} />}
          />

          {InfoRoute({ cocktails, setCocktails, loader: cocktailDetailsLoader })}
        </Route>

        <Route path="random" element={<CocktailsLayout />} errorElement={<CocktailError />}>
          <Route
            index
            element={<RandomCocktail
              setCocktails={setCocktails} />}
          />

          {InfoRoute({ cocktails, setCocktails, loader: cocktailDetailsLoader })}
        </Route>

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
