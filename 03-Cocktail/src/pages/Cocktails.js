import React, { useCallback } from "react";

import CocktailCard from "../components/CocktailCard";
import { CocktailWrapper } from "../Styled/Cocktail";
import {  StyledShowMore, StyledLink } from "../Styled/Navbar";

export default function Home({cocktails, setCocktails}) { 
    const [count, setCount] = React.useState(20)

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`);
            const data = await result.json();
       
            setCocktails(data);
            data.drinks.map(drink => drink.isFavourite = false)
            sessionStorage.setItem("cocktails", JSON.stringify(data))
          };

          if(!JSON.parse(sessionStorage.getItem("cocktails"))){
                fetchData();
          }
          else {
                setCocktails(JSON.parse(sessionStorage.getItem("cocktails")))
          }   
    }, [setCocktails])

    function toggleFavourite(id){
        let changedCocktails = {
            drinks: []
        };

        cocktails.drinks.map(cocktail => {
            if(cocktail.idDrink === id) {
                cocktail.isFavourite = !cocktail.isFavourite;
            }
            changedCocktails.drinks.push(cocktail);
            return changedCocktails;
        })
        setCocktails(changedCocktails)
        sessionStorage.setItem("cocktails", JSON.stringify(changedCocktails))
    }

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            window.removeEventListener("scroll", handleScroll)
            setCount(prev => prev + 20)
        }
    }, [])
    
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [count, handleScroll])

    if(!cocktails.drinks){
        return null;
    }
    return (
        <div>
            {cocktails.drinks.slice(0, count).map(drink => (
                <CocktailWrapper key={drink.idDrink}>
                    <CocktailCard
                        img={drink.strDrinkThumb}
                        title={drink.strDrink}
                        id={drink.idDrink}
                        isFavourite={drink.isFavourite}
                        handleFavourite={() => toggleFavourite(drink.idDrink)}
                    />
                    <StyledShowMore variant="contained"><StyledLink to={drink.idDrink.toString()}>Show More</StyledLink></StyledShowMore>

                </CocktailWrapper>

            ))}
        </div>
    )
}
