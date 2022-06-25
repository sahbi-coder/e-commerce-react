import React from "react";
import styled from "styled-components";
import Twitter from "@material-ui/icons/Twitter";
import Youtube from "@material-ui/icons/YouTube";
import Facebook from "@material-ui/icons/Facebook";
import LocationOn from "@material-ui/icons/LocationOn";
import Mail from "@material-ui/icons/Mail";
import Phone from "@material-ui/icons/Phone";
import { mobile } from "../responsive";
import { extraSmall } from "../responsive";
import { Link } from "react-router-dom";

const Foot = styled.section`
  font-size: 12px;
  background-color: #383633;
  color: #f7eee3;
  width: 100%;
  ${mobile({ width: "100vw" })}
`;
const ContainerOne = styled.div`
  display: flex;
  padding: 35px;
  background-color: #514f4d;
`;
const Left = styled.div`
  flex: 1.5;
  ${extraSmall({ flex: 2 })}
`;
const Right = styled.div`
  flex: 1;
  ${extraSmall({ flex: 0.75 })}
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const FieldWrap = styled.div`
  border: 2px solid #f7eee3;

  display: flex;
  justify-content: flex-start;
  max-width: 390px;
`;
const Field = styled.input`
  border: none;
  outline: none;
  flex: 2px;
  height: 100%;
  padding: 10px;
  background-color: #514f4d;
  color: #f7eee3;
  ${mobile({ width: "20vw" })}
  max-width: 195px;
`;
const Button = styled.button`
  border: none;
  flex: 1px;
  background-color: #f7eee3;
  height: 100%;
  padding: 10px;
  cursor: pointer;
  ${mobile({ width: "20vw" })}
  ${extraSmall({ width: "30vw" })}
  max-width: 195px;
`;
const Sotial = styled.span`
  cursor: pointer;
  margin: 0 3px;
`;
const ContainerTwo = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ display: "grid", gridTemplateColumns: "repeat(2,1fr)" })}
`;
const Group = styled.div`
  background-color: color;
  display: flex;
  flex-direction: column;
`;
const GroupTitle = styled.div`
  text-align: start;
  font-weight: bold;
  padding: 10px;
`;
const GroupContent = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;
const GroupItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
`;
const ContainerThree = styled.div`
  display: flex;
  padding: 35px;
`;
const LeftTwo = styled.div`
  flex: 1;
  padding: 0 2px 0 0;
`;
const RightTwo = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
function Footer() {
  return (
    <Foot>
      <ContainerOne>
        <Left>
          <FieldWrap>
            <Field placeholder="sign up" />
            <Button>SUBSCRIBE</Button>
          </FieldWrap>
        </Left>
        <Right>
          <Sotial>
            <Twitter style={{ color: "#f7eee3" }} />
          </Sotial>
          <Sotial>
            <Youtube style={{ color: "#f7eee3" }} />
          </Sotial>
          <Sotial>
            <Facebook style={{ color: "#f7eee3" }} />
          </Sotial>
        </Right>
      </ContainerOne>
      <ContainerTwo>
        <Group>
          <GroupTitle>About</GroupTitle>
          <GroupContent>
            <GroupItem as={Link} to="/about">
              Our Story
            </GroupItem>
          </GroupContent>
        </Group>
        <Group>
          <GroupTitle>Categories</GroupTitle>
          <GroupContent>
            <GroupItem as={Link} to="/products/tops&blues">
              Tops & Blouses
            </GroupItem>
            <GroupItem as={Link} to="/products/sweachers">
              Sweaters
            </GroupItem>
            <GroupItem as={Link} to="/products/pants">
              Pants
            </GroupItem>
            <GroupItem as={Link} to="/products/dresses">
              Dresses
            </GroupItem>
            <GroupItem as={Link} to="/products/jackets">
              Jackets
            </GroupItem>
            <GroupItem as={Link} to="/products/accessories">
              Accessories
            </GroupItem>
          </GroupContent>
        </Group>
        <Group>
          <GroupTitle>User</GroupTitle>
          <GroupContent>
            <GroupItem as={Link} to="/user">
              Login
            </GroupItem>
            <GroupItem as={Link} to="/cart">
              Chart
            </GroupItem>
          </GroupContent>
        </Group>
        <Group>
          <GroupTitle>Contact</GroupTitle>
          <GroupContent>
            <GroupItem>
              <LocationOn /> 622 Dixie Path , South Tobinchester 98336
            </GroupItem>
            <GroupItem>
              <Phone /> +1 234 56 78
            </GroupItem>
            <GroupItem>
              <Mail /> contact@lama.dev
            </GroupItem>
          </GroupContent>
        </Group>
      </ContainerTwo>
      <ContainerThree>
        <LeftTwo>&copy; 2022 My Fashion, by sahbi kardi</LeftTwo>
        <RightTwo>15 W 27th Street, 9th Floor New York, NY, 10001</RightTwo>
      </ContainerThree>
    </Foot>
  );
}

export default Footer;
