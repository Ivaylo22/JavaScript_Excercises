import React from "react"
import { CocktailExtraInfo, 
    CocktailHeader, 
    CocktailImg, 
    CocktailInfo, 
    CocktailInstructions, 
    CocktailIsChangedWrapper, 
    CocktailTitle, 
    CocktailWrapper, 
    ComponentsWrapper, 
    ExtraCommonInfo, 
    FullCocktailCard, 
    Ingredients } from "../Styled/Cocktail";

import { useLoaderData } from "react-router-dom";

export default function InfoCard() {
    const data = useLoaderData()

    let cocktail = data.drinks[0];

    return (     
        <FullCocktailCard>
            <CocktailWrapper>
                <CocktailImg alt="cocktail" src={cocktail.strDrinkThumb}></CocktailImg>
                <CocktailInfo>
                    <CocktailHeader>
                        <CocktailTitle> {cocktail.strDrink} </CocktailTitle>
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
                
                <CocktailIsChangedWrapper>
                    {
                        cocktail.isChanged !== true ?
                            <h6>There are no changes</h6> :
                            <h6>There are changes</h6>
                    }
                </CocktailIsChangedWrapper>

            </CocktailExtraInfo>

        </FullCocktailCard>

    )
}

// data loader
export const cocktailDetailsLoader = async ({ params }) => {
    const { id } = params 
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
    
    return res.json()
  }