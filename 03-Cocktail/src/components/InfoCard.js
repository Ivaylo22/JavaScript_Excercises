import React from "react"
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { CocktailExtraInfo, CocktailHeader, CocktailImg, CocktailInfo, CocktailInstructions, CocktailIsChangedWrapper, CocktailTitle, CocktailWrapper, ComponentsWrapper, ExtraCommonInfo, FullCocktailCard, Ingredients } from "../Styled/Cocktail";

export default function InfoCard(props) {
    return (     
        <FullCocktailCard>
            <CocktailWrapper>
                <CocktailImg alt="cocktail" src={props.img}></CocktailImg>
                <CocktailInfo>
                    <CocktailHeader>
                        <CocktailTitle onClick={props.handleInfo}> {props.title} </CocktailTitle>
                        {
                            props.isFavourite === undefined ?
                                null :
                                props.isFavourite === false ?
                                    <StarBorderOutlinedIcon onClick={props.handleFavourite} /> :
                                    <StarIcon onClick={props.handleFavourite} />
                        }
                    </CocktailHeader>
                    <CocktailInstructions>{props.instructions}</CocktailInstructions>
                </CocktailInfo>
            </CocktailWrapper>
            
            <CocktailExtraInfo>
                
                <ExtraCommonInfo>
                    <p>{props.allInfo.strAlcoholic}</p>
                    <p>{props.allInfo.strCategory}</p>
                    <p>{props.allInfo.strGlass}</p>
                </ExtraCommonInfo>               
                <ComponentsWrapper>
                    <Ingredients>
                        <p>{props.allInfo.strIngredient1}</p>
                        <p>{props.allInfo.strIngredient2}</p>
                        <p>{props.allInfo.strIngredient3}</p>
                        <p>{props.allInfo.strIngredient4}</p>
                        <p>{props.allInfo.strIngredient5}</p>
                        <p>{props.allInfo.strIngredient6}</p>
                        <p>{props.allInfo.strIngredient7}</p>
                        <p>{props.allInfo.strIngredient8}</p>
                    </Ingredients>
                    <div>
                        <p>{props.allInfo.strMeasure1}</p>
                        <p>{props.allInfo.strMeasure2}</p>
                        <p>{props.allInfo.strMeasure3}</p>
                        <p>{props.allInfo.strMeasure4}</p>
                        <p>{props.allInfo.strMeasure5}</p>
                        <p>{props.allInfo.strMeasure6}</p>
                        <p>{props.allInfo.strMeasure7}</p>
                        <p>{props.allInfo.strMeasure8}</p>
                    </div>

                </ComponentsWrapper>
                
                <CocktailIsChangedWrapper>
                    {
                        props.isChanged !== true ?
                            <h6>There are no changes</h6> :
                            <h6>There are changes</h6>
                    }
                </CocktailIsChangedWrapper>

            </CocktailExtraInfo>

        </FullCocktailCard>

    )
}