import { Link, NavLink } from 'react-router-dom';

import { styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
