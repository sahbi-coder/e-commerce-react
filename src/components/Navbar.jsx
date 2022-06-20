import React from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import Cart from "@material-ui/icons/ShoppingCart";
import Person from "@material-ui/icons/PersonOutline";
import { useSelector, useDispatch } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useMobile from "../hooks/useMobile";
import { mobile } from "../responsive";
import { divisions, changeDiv } from "../redux/divisionSlice";

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  ${mobile({width:'100vw'})}
`;

const NavCatch = styled.div`
  display: flex;
  padding: 1px 10px;
  background-color: #f7eee3;
  font-size: 14px;
`;
const DivisonSelector = styled.div`
  display: flex;
  justify-content: start;
  cursor: pointer;
  background-color: #6d6861;
  color: #f7eee3;
`;
const DivSelect = styled.div`
  margin: 0 10px;
`;
const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: end;
  align-items: center;
  ${mobile({ justifyContent: "center" })}
`;
const Right = styled.div`
  flex: 0.25;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  justify-content: center;
  ${mobile({ flex: 1 })}
`;

const Logo = styled.h1`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
const MenuItem = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin: 4px;

  text-decoration: none;
  color: black;
  &:hover {
    color: rgb(176, 93, 84) !important;
  }

  background: none;
  border: none;
`;
const SubMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
`;
const SubList = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0;
  text-decoration: none;
  color: black;
  &:hover {
    color: rgb(176, 93, 84) !important;
  }
  background: none;
  border: none;
`;
const SubMenuCard = styled.div`
  height: 250px;
  width: 300px;
  position: relative;
  margin: 0 20px;
  cursor: pointer;
`;
const SubMenuCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  object-fit: cover;
`;
const SubMenuCardDesc = styled.div`
  position: absolute;
  top: 80%;
  left: 0;
  width: 100%;
  height: 20%;
  font-size: 14px;
`;
const SideMenu = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
`;
const SideMenuItem = styled.div`
  padding-left: 20px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
const SideMenuSubItem = styled.div`
  padding-left: 40px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const division = useSelector((state) => state.division.division);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [subSideToggle, setSubSideToggle] = useState(false);
  const isMobile = useMobile();
  const dispatch = useDispatch();
  const location = useLocation()
 
  return (
    <Container>
      <NavCatch>Free shipping for all orders over $50!</NavCatch>
      {location.pathname.split('/')[1]==='products'&&(

      <DivisonSelector>
        <DivSelect
          onClick={() => {
            dispatch(changeDiv(divisions.Male));
          }}
        >
          Men
        </DivSelect>
        <DivSelect
          onClick={() => {
            dispatch(changeDiv(divisions.Female));
          }}
        >
          Women
        </DivSelect>
        <DivSelect
          onClick={() => {
            dispatch(changeDiv(divisions.Both));
          }}
        >
          Both
        </DivSelect>
      </DivisonSelector>
      )}
      <Wrapper>
        <Left>
          {!isMobile && (
            <Logo
              as={Link}
              to="/"
              onClick={() => {
                setShowSubMenu(false);
              }}
            >
              MyFashion
            </Logo>
          )}
          {isMobile && (
            <MenuItem
              onClick={() => {
                setToggle((toggle) => !toggle);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </MenuItem>
          )}
        </Left>
        <Center>
          {!isMobile && (
            <>
              <MenuItem
                as={Link}
                to="/"
                onClick={() => {
                  setShowSubMenu(false);
                }}
              >
                HOME
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setShowSubMenu((showSubMenu) => !showSubMenu);
                }}
              >
                CATEGORIES
              </MenuItem>
              <MenuItem
                as={Link}
                to="/about"
                onClick={() => {
                  setShowSubMenu(false);
                }}
              >
                ABOUT
              </MenuItem>
              <MenuItem
                as={Link}
                to="/contact"
                onClick={() => {
                  setShowSubMenu(false);
                }}
              >
                CONTACT
              </MenuItem>
            </>
          )}
          {isMobile && (
            <Logo
              as={Link}
              to="/"
              onClick={() => {
                setShowSubMenu(false);
              }}
            >
              MyFashion
            </Logo>
          )}
        </Center>
        <Right>
          <MenuItem as={Link} to="/user">
            <Person />
          </MenuItem>

          <MenuItem
            as={Link}
            to="/cart"
            onClick={() => {
              setShowSubMenu(false);
            }}
          >
            <Badge badgeContent={quantity} color="primary">
              <Cart />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
      {showSubMenu && !isMobile && (
        <SubMenu>
          <SubList>
            <SubItem as={Link} to="/categories">
              <strong>All</strong>
            </SubItem>
            <SubItem as={Link} to="/products/shirts">
              Shirts
            </SubItem>
            <SubItem as={Link} to="/products/dresses">
              Dresses
            </SubItem>
            <SubItem as={Link} to="/products/jackets">
              Jackets
            </SubItem>
            <SubItem as={Link} to="/products/blouses">
              Tops & Blouses
            </SubItem>
            <SubItem as={Link} to="/products/accessories">
              Accessories
            </SubItem>
            <SubItem as={Link} to="/products/pants">
              Pants
            </SubItem>
          </SubList>
          <SubMenuCard as={Link} to="/about">
            <SubMenuCardImage src="https://source.unsplash.com/r5xHI_H44aM/640x853" />
            <SubMenuCardDesc>
              <i>know more about us</i>
            </SubMenuCardDesc>
          </SubMenuCard>
        </SubMenu>
      )}
      {toggle && isMobile && (
        <SideMenu>
          <SideMenuItem as={Link} to="/">
            HOME
          </SideMenuItem>
          <SideMenuItem
            onClick={() => {
              setSubSideToggle((subSideToggle) => !subSideToggle);
            }}
          >
            CATEGORIES
          </SideMenuItem>
          {subSideToggle && (
            <>
              <SideMenuSubItem as={Link} to="/categories">
                All
              </SideMenuSubItem>
              <SideMenuSubItem as={Link} to="/products/shirts">
                Shirts
              </SideMenuSubItem>
              <SideMenuSubItem as={Link} to="/products/dresses">
                Dresses
              </SideMenuSubItem>
              <SideMenuSubItem as={Link} to="/products/jackets">
                Jackets
              </SideMenuSubItem>
              <SideMenuSubItem as={Link} to="/products/blouses">
                Tops & Blouses
              </SideMenuSubItem>
              <SideMenuSubItem as={Link} to="/products/accessories">
                Accessories
              </SideMenuSubItem>
              <SideMenuSubItem as={Link} to="/products/pants">
                Pants
              </SideMenuSubItem>
            </>
          )}
          <SideMenuItem as={Link} to="/about">
            ABOUT
          </SideMenuItem>
          <SideMenuItem as={Link} to="/contact">
            CONTACT
          </SideMenuItem>
        </SideMenu>
      )}
    </Container>
  );
}

export default Navbar;
