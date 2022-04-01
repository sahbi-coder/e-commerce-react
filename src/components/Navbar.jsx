import React from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Badge from "@material-ui/core/Badge";
import Cart from "@material-ui/icons/ShoppingCart";
import Person from "@material-ui/icons/PersonOutline";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Container = styled.section`
  
`;

const NavCatch  =styled.div`
 display: flex;
 padding:10px;
 background-color: #f7eee3;
`
const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
 
`;
const Right = styled.div`
  flex: 1;
  display:flex;
  justify-content: flex-end;
  padding: 0 10px;
  
`;


const Logo = styled.h1`
  font-size: 20px;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 0 2px;

`;
const MenuCategory = styled.button`
display: flex;
margin:0 10px;
background: none;
border: none;
&:focus{
  color:rgb(176, 93, 84);
 
}

`

function Navbar() {
  const quantity = useSelector((state)=>state.cart.quantity)

  return (
    <Container>
      <NavCatch>Free shipping for all orders over $50!</NavCatch>
      <Wrapper>
        <Left>
        <Logo>MyFashion</Logo>
        </Left>
        <Center>
          <MenuCategory>
          Tops & Blouses<KeyboardArrowDownIcon/>
          </MenuCategory>
          <MenuCategory>
          Sweaters<KeyboardArrowDownIcon/>
          </MenuCategory>
          <MenuCategory>
          Pants<KeyboardArrowDownIcon/>
          </MenuCategory>
          <MenuCategory>
          Dresses<KeyboardArrowDownIcon/>
          </MenuCategory>
          <MenuCategory>
          Jackets<KeyboardArrowDownIcon/>
          </MenuCategory>
          <MenuCategory>
          Accessories<KeyboardArrowDownIcon/>
          </MenuCategory>

          
        </Center>
        <Right>
          <MenuItem><Person/></MenuItem>
         
          <Link to='/cart'>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <Cart color="action" />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
