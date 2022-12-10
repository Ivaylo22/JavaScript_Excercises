import React from "react";
import Home from "./views/Home"
import Favourites from "./views/Favourites";
import SearchAppBar from "./components/SearchAppBar";
import SearchedCocktail from "./views/SearchedCocktail";
import RandomCocktail from "./views/RandomCocktail";

import { ContentWrapper, MainContent } from "./Styled/Container";
import { GlobalStyle } from "./Styled/Global";


export default function App() {
    const [cocktails, setCocktails] = React.useState([]);
    const [view, setView] = React.useState("home")
    const [count, setCount] = React.useState(0)
    const [loading, setLoading] = React.useState(false);
    const [textInput, setTextInput] = React.useState('');


      const ActiveView = () => {
      switch (view) {
            case "home":
                return <Home 
                cocktails={cocktails}
                setCocktails={setCocktails}
                count={count}
                setCount={setCount}
                loading={loading}
                setLoading={setLoading}
                />;
            case "favourites":
                return <Favourites
                cocktails={cocktails}
                setCocktails={setCocktails}
                count={count}
                setCount={setCount}
                loading={loading}
                setLoading={setLoading}
                />;
            case "search":
                return <SearchedCocktail
                textInput={textInput}
                setTextInput={setTextInput}
                cocktails={cocktails}
                setCocktails={setCocktails}              
                />
            case "random":
                return <RandomCocktail 
                cocktails={cocktails}
                setCocktails={setCocktails}  
                />
          default:
              // return <View3 />;
          }
      };

      function handleClick(newView) {
        setCocktails(oldCocktails => oldCocktails.map(cocktail => {          
            return {...cocktail, isFavourite: cocktail.isFavourite}
        }))
          setView(newView)
      }


  return (
    <ContentWrapper>
        <GlobalStyle />
        <SearchAppBar 
        changeView={(newView) => handleClick(newView)}
        textInput={textInput}
        setTextInput={setTextInput}
        setView={setView}
        />

        <MainContent>
            {ActiveView()}
        </MainContent>
    </ContentWrapper>
  )
}

