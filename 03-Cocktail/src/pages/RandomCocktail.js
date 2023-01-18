import React from "react";

import CocktailCard from "../components/CocktailCard";
import { fetchRandomCocktail } from "../Helpers";
import { CocktailWrapper } from "../Styled/Cocktail";

export default function RandomCocktail(){
    const [randomCocktail, setRandomCocktail] = React.useState({})

    React.useEffect(() => {
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
            </CocktailWrapper>
        </div>
    )

}