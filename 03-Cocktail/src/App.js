import React from "react";


import { ContentWrapper } from "./Styled/Container";
import { GlobalStyle } from "./Styled/Global";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import InfoCard, { cocktailDetailsLoader } from "./components/InfoCard";


//pages
import Home from "./pages/Home"
import Favourites from "./pages/Favourites";
import RandomCocktail from "./pages/RandomCocktail";
import NotFound from "./pages/NotFound";
import Cocktails from "./pages/Cocktails";



//layout
import RootLayout from "./layouts/RootLayout";
import CocktailsLayout from "./layouts/CocktailsLayout";

function App() {
    const [cocktails, setCocktails] = React.useState([]);

    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout 
            cocktails={cocktails}
            setCocktails={setCocktails}
          />}>
            <Route index element={<Home />} />
            <Route path="cocktails" element={ <CocktailsLayout />}>

              <Route
                index
                element={<Cocktails
                  cocktails={cocktails}
                  setCocktails={setCocktails} />}
              />
              <Route
                path=":id"
                element={<InfoCard
                  cocktails={cocktails}
                  setCocktails={setCocktails}
                />}
                loader={cocktailDetailsLoader}
              />
            </Route>

            <Route path="favourites" element={ <CocktailsLayout />}>
              <Route
                index
                element={<Favourites
                  cocktails={cocktails}
                  setCocktails={setCocktails} />}
              />
              <Route
                path=":id"
                element={<InfoCard />}
                loader={cocktailDetailsLoader}
              />
            </Route>

            <Route path="random" element={ <CocktailsLayout />}>
              <Route
                index
                element={<RandomCocktail />}
                  
              />
              <Route
                path=":id"
                element={<InfoCard />}
                loader={cocktailDetailsLoader}
              />
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
