import { Outlet, useLocation  } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import {  StyledButton, StyledNavbar, StyledStack } from "../Styled/Navbar";

export default function RootLayout({cocktails, setCocktails}) {
    let location = useLocation();

    // function handleClick(e) {
    //     const input = document.getElementById("search-input");
    //     let isContained = false;


    //     if(location.pathname === "/favourites") {
    //         cocktails.drinks.filter(drink => drink.isFavourite).map(drink => {
    //             if(drink.strDrink === input.value){
    //                 isContained = true;
    //             }
    //             return isContained
    //         })
    //     }
    //     else {
    //         cocktails.drinks.map(drink => {
    //             if(drink.strDrink === input.value){
    //                 isContained = true;
    //             }
    //             return isContained
    //         })
    //     }
    //     if(e.key === "Enter" && isContained) {
    //         const cocktail = cocktails.drinks.filter(drink => drink.strDrink === input.value)
    //         console.log(cocktail)
            
    //     }
       
    // }

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                <StyledStack spacing={1} direction="row">
                                    <StyledNavbar to="/" ><StyledButton variant="contained">Home</StyledButton></StyledNavbar>
                                    <StyledNavbar to="cocktails" ><StyledButton variant="contained">Cocktails</StyledButton></StyledNavbar>
                                    <StyledNavbar to="favourites" ><StyledButton variant="contained">Favourites</StyledButton></StyledNavbar>
                                    <StyledNavbar to="random"  reloadDocument={true}><StyledButton variant="contained">Random</StyledButton></StyledNavbar>
                                    {
                                        cocktails.drinks !== undefined ?
                                        location.pathname === "/favourites" ? 
                                        <Stack spacing={3} sx={{ width: 160, height: 40 }}>
                                            <Autocomplete
                                                id="search-input"
                                                freeSolo
                                                options={cocktails.drinks.filter(drink => drink.isFavourite).map((option) => option.strDrink)}
                                                renderInput={(params) => <TextField {...params} label="Search..." />}
                                            />
                                        </Stack> : 
                                        <Stack spacing={3} sx={{ width: 160, height: 40 }}>
                                            <Autocomplete
                                                id="search-input"
                                                freeSolo
                                                options={cocktails.drinks.map((option) => option.strDrink)}
                                                renderInput={(params) => <TextField {...params} label="Search..." />}
                                            />
                                        </Stack> : null
                                    }                                   
                                </StyledStack>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}