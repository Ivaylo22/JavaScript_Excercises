import React from "react"

import CocktailCard from "../components/CocktailCard"
import InfoCard from "../components/InfoCard";

import { ViewTitle } from "../Styled/Views";

export default function SearchedCocktail(props) {
    const [result, setResult] = React.useState({})

    async function fetchSearched() {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${props.textInput.toLowerCase()}`)
        const data = await response.json();

        if(data.drinks === null){
            setResult(undefined)
        }
        else {
            if(data.drinks[0].strDrink.toLowerCase() === props.textInput || data.drinks[0].strDrink === props.textInput){
                props.cocktails.map(cock => {
                    if(cock.idDrink === data.drinks[0].idDrink){
                        data.drinks[0].isFavourite = cock.isFavourite;
                    }
                    else {
                        return null;
                    }
                })
                setResult(data.drinks[0])
            }
            else {
                setResult(undefined)
            }
        }
    }
    React.useEffect(() => {
        fetchSearched()
    }, [props.textInput])


    function toggleInfo() {
        setResult(oldResult => {
            return {...oldResult, info: !oldResult.info}
        })
    }


    if(result === undefined){
        return <ViewTitle>There is no such a cocktail</ViewTitle>
    }
    else {
        if(result.info) {
            return (
                <div>
                    <ViewTitle>Searched Cocktail: {result.strDrink}</ViewTitle>
                    <InfoCard 
                        key = {result.idDrink}
                        id={result.idDrink}
                        title= {result.strDrink}
                        img= {result.strDrinkThumb}
                        instructions= {result.strInstructions}
                        handleInfo = {toggleInfo}
                        allInfo = {result} 
                    />
                </div>

            )
        }
        else {
            return (    
                <div>              
                    <ViewTitle>Searched Cocktail: {result.strDrink}</ViewTitle>
                    <CocktailCard 
                        key = {result.idDrink}
                        id={result.idDrink}
                        title= {result.strDrink}
                        img= {result.strDrinkThumb}
                        instructions= {result.strInstructions}
                        handleInfo = {() => toggleInfo(result.idDrink)}

                    />
                </div>
            )
        }
       
    }
        
}