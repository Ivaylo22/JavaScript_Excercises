import React from "react"
import CocktailCard from "../components/CocktailCard"
import { CocktailWrapper } from "../Styled/Cocktail"
import { StyledLink, StyledShowMore } from "../Styled/Navbar"
import { ViewTitle } from "../Styled/Views";


export default function Favourites({cocktails, setCocktails}) {

    React.useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("cocktails"))
        setCocktails(data)
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
                        handleFavourite={() => toggleFavourite(drink.idDrink)}
                    />
                    <StyledShowMore variant="contained"><StyledLink to={drink.idDrink.toString()}>Show More</StyledLink></StyledShowMore>

                </CocktailWrapper>

            ))}
        </div>
    )
}