import { fireEvent } from "@testing-library/react";
import React from "react"
import CocktailCard from "../components/CocktailCard"
import InfoCard from "../components/InfoCard";
import { ViewTitle } from "../Styled/Views";
var _ = require('lodash');

export default function Favourites(props) {
    const [currCocktails, setCurrCocktails] = React.useState([])
    const [favCocktails, setFavCocktails] = React.useState([])
    const [updatedCocktails, setUpdatedCocktails] = React.useState([])

    React.useEffect(() => {
        sessionStorage.setItem("cocktails", JSON.stringify(props.cocktails))
    }, [props.cocktails])


    // get current favourite cocktails
    React.useEffect(() => {
    let currentFavouriteCocktails = []
    props.cocktails.map(cocktail => {
        if(cocktail.isFavourite){
            currentFavouriteCocktails.push(cocktail)
        }
        return setFavCocktails(currentFavouriteCocktails)
    })
    }, [props.cocktails])


    //get current data
    React.useEffect(() => {
        const currentCocktails = []

        favCocktails.map(async (cocktail) => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`)
            const data = await response.json()
            data.drinks[0].isChanged = false;
            currentCocktails.push(data.drinks[0])    
            if(currentCocktails.length === favCocktails.length){
                setCurrCocktails(currentCocktails)
            }

        })
    }, [favCocktails, props.cocktails])

    React.useEffect(() => {
        let currFavourites = [] 
        for(let i = 0; i < favCocktails.length; i++) {
            for(let y = 0; y< currCocktails.length; y++) {
                if(favCocktails[i].idDrink === currCocktails[y].idDrink) {
                    favCocktails[i].info = false;
                    if(favCocktails[i].dateModified !== currCocktails[y].dateModified) {
                        favCocktails[i].isChanged = true;
                        currFavourites.push(favCocktails[i])
                    }
                    else {
                        currFavourites.push(favCocktails[i])
                    }
                    
                }
            }
        }
        setUpdatedCocktails(currFavourites)

    }, [favCocktails, currCocktails])

    function toggleFavourite(id){
        props.setCocktails(oldCocktails => oldCocktails.map(cocktail => {
            return cocktail.idDrink === id ? 
                {...cocktail, isFavourite: !cocktail.isFavourite} :
                cocktail
        }))
    }

    function toggleInfo(id){
        setUpdatedCocktails(oldCocktails => oldCocktails.map(cocktail => {
            return cocktail.idDrink === id ? 
                {...cocktail, info: !cocktail.info} :
                cocktail
        }))
    }

    const dataElements = updatedCocktails.map((fav, index) => {
        if(fav.isFavourite){
            if(fav.info) {
                return (
                    <InfoCard 
                        key = {fav.idDrink}
                        id={fav.idDrink}
                        title= {fav.strDrink}
                        img= {fav.strDrinkThumb}
                        instructions= {fav.strInstructions}
                        handleFavourite = {() => toggleFavourite(fav.idDrink)}
                        handleInfo = {() => toggleInfo(fav.idDrink)}
                        allInfo = {fav} 
                        isFavourite = {fav.isFavourite}
                        isChanged = {fav.isChanged}
                    />
                )
            }
            else {
                return (
                    <div key = {fav.idDrink}>
                        <CocktailCard 
                            key = {index}
                            id={fav.idDrink}
                            title= {fav.strDrink}
                            img= {fav.strDrinkThumb}
                            instructions= {fav.strInstructions}
                            handleFavourite = {() => toggleFavourite(fav.idDrink)}
                            handleInfo = {() => toggleInfo(fav.idDrink)}
                            isFavourite = {fav.isFavourite}
                            allProps = {fav}
                            isChanged = {fav.isChanged}

                         />                      
                    </div>            
                )
            }
           
        }
        else {
            return null;
        }
    })

    return (
        <div>          
            <ViewTitle>
                {
                props.cocktails.some(c => c.isFavourite === true) ?
                    <h2>Favourites</h2> :
                    <h2>There are no favourites at this moment</h2>        
                }
            </ViewTitle>
            <div>{dataElements}</div>
        </div>
        
    )
}