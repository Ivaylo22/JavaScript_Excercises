import React from "react";

import CocktailCard from "../components/CocktailCard";
import { CocktailWrapper } from "../Styled/Cocktail";
import { StyledLink, StyledShowMore } from "../Styled/Navbar";

export default function RandomCocktail(){
    const [randomCocktail, setRandomCocktail] = React.useState({})
    React.useEffect(() => {
        async function fetchRandom() {
            const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            const data = await response.json()
            
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