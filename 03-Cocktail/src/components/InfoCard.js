import React from "react"

import { useLoaderData } from "react-router-dom";

import { toggleFavourite } from "../Helpers";

import { CocktailExtraInfo, 
    CocktailHeader, 
    CocktailImg, 
    CocktailInfo, 
    CocktailInstructions, 
    CocktailTitle, 
    CocktailWrapper, 
    ComponentsWrapper, 
    ExtraCommonInfo, 
    FullCocktailCard, 
    Ingredients } from "../Styled/Cocktail";


import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { fetchCocktailById } from "../Helpers";

// data loader
export const cocktailDetailsLoader = async ({ params }) => {
    const { id } = params
    const res = await fetchCocktailById(id)

    return res.json()
}

export default function InfoCard({ setCocktails}) {
    const data = useLoaderData()
    let cocktail = data.drinks[0];

    const allCocktails = JSON.parse(localStorage.getItem("cocktails"));
    const actualCocktail = allCocktails.drinks.find(drink => drink.idDrink === cocktail.idDrink)

    if(!actualCocktail || !actualCocktail.isFavourite){
        cocktail.lastUpdate = actualCocktail.lastUpdate
        cocktail.isFavourite = false
    }
    else {
        cocktail.lastUpdate = actualCocktail.lastUpdate
        cocktail.isFavourite = true
    }

    return (     
        <FullCocktailCard>
            <CocktailWrapper>
                <CocktailImg alt="cocktail" src={cocktail.strDrinkThumb}></CocktailImg>
                <CocktailInfo>
                    <CocktailHeader>
                        <CocktailTitle> {cocktail.strDrink} </CocktailTitle>
                        {
                            cocktail.isFavourite === undefined ?
                                null :
                                cocktail.isFavourite === false ?
                                    <StarBorderOutlinedIcon onClick={()=>toggleFavourite(cocktail.idDrink, allCocktails, setCocktails)} /> :
                                    <StarIcon onClick={()=>toggleFavourite(cocktail.idDrink, allCocktails, setCocktails)} />
                        }
                    </CocktailHeader>
                    <CocktailInstructions>{cocktail.strInstructions}</CocktailInstructions>
                </CocktailInfo>
            </CocktailWrapper>
            
            <CocktailExtraInfo>
                
                <ExtraCommonInfo>
                    <p>{cocktail.strAlcoholic}</p>
                    <p>{cocktail.strCategory}</p>
                    <p>{cocktail.strGlass}</p>
                </ExtraCommonInfo>               
                <ComponentsWrapper>
                    <Ingredients>
                        <p>{cocktail.strIngredient1}</p>
                        <p>{cocktail.strIngredient2}</p>
                        <p>{cocktail.strIngredient3}</p>
                        <p>{cocktail.strIngredient4}</p>
                        <p>{cocktail.strIngredient5}</p>
                        <p>{cocktail.strIngredient6}</p>
                        <p>{cocktail.strIngredient7}</p>
                        <p>{cocktail.strIngredient8}</p>
                    </Ingredients>
                    <div>
                        <p>{cocktail.strMeasure1}</p>
                        <p>{cocktail.strMeasure2}</p>
                        <p>{cocktail.strMeasure3}</p>
                        <p>{cocktail.strMeasure4}</p>
                        <p>{cocktail.strMeasure5}</p>
                        <p>{cocktail.strMeasure6}</p>
                        <p>{cocktail.strMeasure7}</p>
                        <p>{cocktail.strMeasure8}</p>
                    </div>
                </ComponentsWrapper>

            {cocktail.lastUpdate > cocktail.dateModified ? <h4>there are changes</h4> : <h4>there are no changes</h4>}
            </CocktailExtraInfo>
        </FullCocktailCard>

    )
}

