import React from "react";
import CocktailCard from "../components/CocktailCard";
import InfoCard from "../components/InfoCard";
import { ViewTitle } from "../Styled/Views";

export default function RandomCocktail(props){
    const [randomRes, setRandomRes] = React.useState({})
    React.useEffect(() => {
        fetchRandom()
    }, [props.cocktails])

    async function fetchRandom() {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        const data = await response.json()
        data.drinks[0].info = false;
        
        setRandomRes(data.drinks[0])
    }

    function toggleInfo() {
        setRandomRes(oldResult => {
            return {...oldResult, info: !oldResult.info}
        })
    }


    if(randomRes.info) {
        return (
            <div>
                <ViewTitle>Random Cocktail: {randomRes.strDrink}</ViewTitle>
                <InfoCard 
                    key = {randomRes.idDrink}
                    id={randomRes.idDrink}
                    title= {randomRes.strDrink}
                    img= {randomRes.strDrinkThumb}
                    instructions= {randomRes.strInstructions}
                    handleInfo = {toggleInfo}
                    allInfo = {randomRes} 
                />

            </div>       
        )
    }
    else {
        return (
            <div>           
                <ViewTitle>Random Cocktail: {randomRes.strDrink}</ViewTitle>
                <CocktailCard 
                    key = {randomRes.idDrink}
                    id={randomRes.idDrink}
                    title= {randomRes.strDrink}
                    img= {randomRes.strDrinkThumb}
                    instructions= {randomRes.strInstructions}
                    handleInfo = {toggleInfo}
                />
            </div>  
        )
    }

}