import React from "react"
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { CocktailHeader, CocktailInfo, CocktailTitle, CocktailWrapper } from "../Styled/Cocktail";
import { CocktailInstructions } from "../Styled/Cocktail";
import { CocktailImg } from "../Styled/Cocktail";
import { CocktailIsChangedWrapper } from "../Styled/Cocktail";

export default function CocktailCard(props) {
    return (
        <CocktailWrapper>
            <CocktailImg alt="cocktail" src={props.img}></CocktailImg>      
            <CocktailInfo>                
                <CocktailHeader>  
                    <CocktailTitle onClick={props.handleInfo}> {props.title} </CocktailTitle>        
                    {              
                    props.isFavourite === undefined ? 
                    null:
                    props.isFavourite === false ?
                    <StarBorderOutlinedIcon onClick={props.handleFavourite}/> :
                    <StarIcon onClick={props.handleFavourite}/>
                    }
                </CocktailHeader>   
                <CocktailInstructions>{props.instructions}</CocktailInstructions>
            </CocktailInfo>
            <CocktailIsChangedWrapper>
                {
                    props.isChanged !== true ?
                    <h6>There are no changes</h6> :
                    <h6>There are changes</h6>
                }
            </CocktailIsChangedWrapper>
        </CocktailWrapper>

    )
}