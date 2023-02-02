import React, { useEffect } from "react"

import CocktailCard from "../components/CocktailCard"
import { CocktailWrapper } from "../Styled/Cocktail"
import { StyledLink, StyledShowMore } from "../Styled/Navbar"
import { ViewTitle } from "../Styled/Views";

import { toggleFavourite } from "../Helpers";


export default function Favourites({cocktails, setCocktails}) {
    useEffect(() => {
        setCocktails(JSON.parse(localStorage.getItem("cocktails")))
    }, [setCocktails])

    if(!cocktails.drinks) {
        return null
    }
    if(cocktails.drinks.filter(drink => drink.isFavourite).length === 0) {
        return (
            <ViewTitle>There are no favourites</ViewTitle>
        )
    }

    return (
        <div>
            {cocktails.drinks.filter(drink => drink.isFavourite).map(drink => (
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