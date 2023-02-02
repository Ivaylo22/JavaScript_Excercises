import React, { useEffect, useState } from "react";

import CocktailCard from "../components/CocktailCard";
import { fetchAllCocktails, fetchRandomCocktail, isObjEmpty } from "../Helpers";
import { CocktailWrapper } from "../Styled/Cocktail";
import { StyledShowMore, StyledLink } from "../Styled/Navbar";

import { toggleFavourite } from "../Helpers";

import { dformat } from "../Helpers";

//cant add a star to toggle favourite because the random cocktail might not be inside all cocktails array

export default function RandomCocktail({cocktails, setCocktails}){
    const [randomCocktail, setRandomCocktail] = useState({})

    if(!JSON.parse(localStorage.getItem("cocktails"))){
        const fetchData = async () => {
            const data = await fetchAllCocktails();
       
            setCocktails(data);
            data.drinks.map(drink => {
                drink.isFavourite = false
                drink.lastUpdate = dformat
                return drink
            })
            localStorage.setItem("cocktails", JSON.stringify(data))
          };

          fetchData();
    }
    const allCocktails = JSON.parse(localStorage.getItem("cocktails"))


    useEffect(() => {
        async function fetchRandom() {
            const data = await fetchRandomCocktail()
              
            setRandomCocktail(data.drinks[0])
        }
        fetchRandom()
    }, [])

    useEffect(() => {
        if(!isObjEmpty(randomCocktail)){
            const actualCocktail = allCocktails.drinks.find(drink => drink.idDrink === randomCocktail.idDrink)
            let temporaryCocktail = randomCocktail
    
            if(actualCocktail){
                temporaryCocktail.isFavourite = actualCocktail.isFavourite
            }
            else {
                temporaryCocktail.isFavourite = false;
                allCocktails.drinks.push(temporaryCocktail)
                localStorage.setItem("cocktails", JSON.stringify(allCocktails))
            }
    
            setRandomCocktail(temporaryCocktail)
        }
    }, [randomCocktail, allCocktails])
    

    if(!randomCocktail.idDrink){
        return null;
    }
    return (
        <div>       
            <CocktailWrapper key={randomCocktail.idDrink}>
                <CocktailCard
                    img={randomCocktail.strDrinkThumb}
                    title={randomCocktail.strDrink}
                    id={randomCocktail.idDrink}
                    isFavourite={randomCocktail.isFavourite}
                    handleFavourite={() => toggleFavourite(randomCocktail.idDrink, allCocktails, setCocktails)}
                />
                <StyledShowMore variant="contained"><StyledLink to={randomCocktail.idDrink.toString()}>Show More</StyledLink></StyledShowMore>
            </CocktailWrapper>
        </div>
    )

}