import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import {  StyledButton, StyledNavbar, StyledStack, StyledShowMore, StyledLink} from "../Styled/Navbar";
import CocktailCard from "../components/CocktailCard";
import { CocktailWrapper } from "../Styled/Cocktail";

export default function RootLayout({cocktails, setCocktails}) {
    const allCocktails = JSON.parse(localStorage.getItem("cocktails"));
    const [searchedCocktail, setSearchedCocktail] = useState({});
    const navigate = useNavigate();
    
    document.addEventListener("keyup", handleClick)

    function handleClick(e) {
        e.preventDefault();
        let value = "";
        let input = document.getElementById("search-input");
        if(input){
            value = input.value;    
        }
        if (e.key === "Enter") {          
            setSearchedCocktail({});            
            if(!allCocktails ) return null;
            let searched = allCocktails.drinks.find(drink => drink.strDrink === value)

            if(searched){
                setSearchedCocktail(searched)
                navigate('/cocktails')
            }
        }
    }

    function toggleFavourite(id){
        let changedCocktails = {
            drinks: []
        };

        allCocktails.drinks.map(cocktail => {
            if(cocktail.idDrink === id) {
                cocktail.isFavourite = !cocktail.isFavourite;
            }
            changedCocktails.drinks.push(cocktail);
            return changedCocktails;
        })
        localStorage.setItem("cocktails", JSON.stringify(changedCocktails))
        setCocktails(changedCocktails)
        searchedCocktail.isFavourite = !searchedCocktail.isFavourite;
    }

    function changePage() {
        setSearchedCocktail({});
    }

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar >
                                <StyledStack spacing={1} direction="row" >
                                    <StyledNavbar onClick={changePage} to="/" ><StyledButton variant="contained">Home</StyledButton></StyledNavbar>
                                    <StyledNavbar onClick={changePage} to="cocktails" ><StyledButton variant="contained">Cocktails</StyledButton></StyledNavbar>
                                    <StyledNavbar onClick={changePage} to="favourites" ><StyledButton variant="contained">Favourites</StyledButton></StyledNavbar>
                                    <StyledNavbar onClick={changePage} to="random"  reloadDocument={true}><StyledButton variant="contained">Random</StyledButton></StyledNavbar>
                                    {
                                        !allCocktails ? null :
                                            <Stack spacing={3} sx={{ width: 160, height: 40 }}>
                                                <Autocomplete
                                                    id="search-input"
                                                    freeSolo
                                                    options={allCocktails.drinks.map((option) => option.strDrink)}
                                                    renderInput={(params) => <TextField  
                                                        {...params} 
                                                        label="Search..." />}
                                                />
                                            </Stack> 
                                    }                                   
                                </StyledStack>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </nav>
            </header>
            <main>
                {
                    JSON.stringify(searchedCocktail) !== '{}' ?
                        
                        <CocktailWrapper>
                            <CocktailCard
                                img={searchedCocktail.strDrinkThumb}
                                title={searchedCocktail.strDrink}
                                isFavourite={searchedCocktail.isFavourite}
                                handleFavourite={() => toggleFavourite(searchedCocktail.idDrink)}
                            />
                            <StyledShowMore variant="contained"><StyledLink reloadDocument={true} to={searchedCocktail.idDrink.toString()}>Show More</StyledLink></StyledShowMore>
                        </CocktailWrapper> :
                        <Outlet />
                }
            </main>
        </div>
    )
}