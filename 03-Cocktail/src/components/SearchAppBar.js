import React from "react"
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { StyledSearchIcon } from "../Styled/Navbar";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    color: 'theme.palette.common',
    backgroundColor: `#3b8ad9`,
    width: '150px',
    margin: `0 20px`
  }));

  const StyledStack = styled(Stack)(({ theme }) => ({
    margin: `0 auto`
  }));
    
  

export default function SearchAppBar(props) {
  const handleTextInputChange = event => {
    props.setTextInput(event.target.value);
};
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>

            <StyledStack spacing={2} direction="row">
                <StyledButton variant="contained" onClick={()=>props.changeView("home")} >Home</StyledButton>
                <StyledButton variant="contained" onClick={()=>props.changeView("favourites")}>Favourites</StyledButton>
                <StyledButton variant="contained" onClick={()=>props.changeView("random")}>Get Random</StyledButton>
            </StyledStack>

            <Search>
              <Button onClick={()=>props.changeView("search")}>
              <SearchIconWrapper>
                <StyledSearchIcon></StyledSearchIcon>
                </SearchIconWrapper>
              </Button>

                <StyledInputBase
                onChange= {handleTextInputChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            </Toolbar>
        </AppBar>
        </Box>
    );
    }