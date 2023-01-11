import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';

export const StyledSearchIcon = styled(SearchIcon)`
    &:hover {
        cursor: pointer;
        }
`

export const Search = styled('div')(({ theme }) => ({
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

  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
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

  export const StyledButton = styled(Button)(() => ({
    backgroundColor: `#3b8ad9`,
    width: '120px',
    margin: `0 20px`
  }));

  export const StyledShowMore = styled(Button)(() => ({
    color: `white`,
    backgroundColor: `#3b8ad9`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `0 auto`
  }));
  
  export const StyledStack = styled(Stack)(() => ({
    margin: `0 auto`
  }));

  export const StyledNavbar = styled(NavLink)(() => ({
    width: `150 px`,
    marginRight: `0px`,
    padding: `5px`,
    textDecoration: `none`

  }));

  export const StyledLink = styled(Link)(() => ({
    width: `150 px`,
    marginRight: `0px`,
    padding: `5px`,
    textDecoration: `none`,
    color: `white`
  }));
