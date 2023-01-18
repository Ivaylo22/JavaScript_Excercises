import React, { useEffect, useState } from "react";

import CocktailCard from "../components/CocktailCard";
import { fetchRandomCocktail } from "../Helpers";
import { CocktailWrapper } from "../Styled/Cocktail";
import { StyledShowMore, StyledLink } from "../Styled/Navbar";

//cant add a star to toggle favourite because the random cocktail might not be inside all cocktails array

export default function RandomCocktail(){
    const [randomCocktail, setRandomCocktail] = useState({})

    useEffect(() => {
        async function fetchRandom() {
            const data = await fetchRandomCocktail()
              
            setRandomCocktail(data.drinks[0])
        }
        fetchRandom()
    }, [])

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
                />
                <StyledShowMore variant="contained"><StyledLink to={randomCocktail.idDrink.toString()}>Show More</StyledLink></StyledShowMore>
            </CocktailWrapper>
        </div>
    )

}