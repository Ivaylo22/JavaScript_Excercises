import React from "react"

import { CocktailTitle, CocktailWrapper, CocktailImg } from "../Styled/Cocktail";

import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';


export default function CocktailCard(props) {
    const {img, title, isFavourite, handleFavourite} = props

    return (
        <CocktailWrapper>
            <CocktailImg alt="cocktail" src={img}></CocktailImg>   
            <CocktailTitle> {title} </CocktailTitle>   
            {
                isFavourite === undefined ?
                    null :
                    isFavourite === false ?
                        <StarBorderOutlinedIcon onClick={handleFavourite} /> :
                        <StarIcon onClick={handleFavourite} />
            }
        </CocktailWrapper>

    )
}