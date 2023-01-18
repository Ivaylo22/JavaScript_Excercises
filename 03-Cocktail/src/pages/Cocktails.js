import React, { useCallback, useEffect, useState} from "react";

import CocktailCard from "../components/CocktailCard";
import { CocktailWrapper } from "../Styled/Cocktail";
import {  StyledShowMore, StyledLink } from "../Styled/Navbar";

import { toggleFavourite } from "../Helpers";
import { fetchAllCocktails } from "../Helpers";

export default function Home({cocktails, setCocktails}) { 
    const [count, setCount] = useState(20)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCocktails();
       
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

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            window.removeEventListener("scroll", handleScroll)
            setCount(prev => prev + 20)
        }
    }, [])
    
    useEffect(() => {
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
                        handleFavourite={() => toggleFavourite(drink.idDrink, cocktails, setCocktails)}
                    />
                    <StyledShowMore variant="contained"><StyledLink to={drink.idDrink.toString()}>Show More</StyledLink></StyledShowMore>

                </CocktailWrapper>

            ))}
        </div>
    )
}
