import React, { useCallback, useEffect,  useState } from "react";

import CocktailCard from "../components/CocktailCard";
import { fetchAllCocktails, fetchRandomCocktail, isObjEmpty, setDefaultFavAndUpdate } from "../Helpers";
import { CocktailWrapper } from "../Styled/Cocktail";
import { StyledShowMore, StyledLink } from "../Styled/Navbar";

import { toggleFavourite } from "../Helpers";

export default function RandomCocktail({setCocktails}){
    const [randomCocktail, setRandomCocktail] = useState({})
    const memorizedSetDefault = useCallback((drink) => {
        setDefaultFavAndUpdate(drink)
    }, [])
    
    const memorizedToggleFavourite = useCallback((id, cocktails, setCocktails) => {
        toggleFavourite(id, cocktails, setCocktails)
    }, [])
    
    if(!JSON.parse(localStorage.getItem("cocktails"))){
        const fetchData = async () => {
            const data = await fetchAllCocktails();
       
            setCocktails(data);
            data.drinks.map(drink => {
                return memorizedSetDefault(drink)
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
                    handleFavourite={() => memorizedToggleFavourite(randomCocktail.idDrink, allCocktails, setCocktails)}
                />
                <StyledShowMore variant="contained"><StyledLink to={`../cocktails/${randomCocktail.idDrink.toString()}`}>Show More</StyledLink></StyledShowMore>
            </CocktailWrapper>
        </div>
    )

}