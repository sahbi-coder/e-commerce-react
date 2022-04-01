import React from "react";

import styled from "styled-components";
import Twitter from "@material-ui/icons/Twitter";

import Youtube from "@material-ui/icons/YouTube";
import Facebook from "@material-ui/icons/Facebook";
import LocationOn from "@material-ui/icons/LocationOn"
import Mail from "@material-ui/icons/Mail"
import Phone from "@material-ui/icons/Phone"

const Foot = styled.section`
font-size: 12px;
background-color: #383633;
color: #f7eee3;
`;
const ContainerOne = styled.div`
  display: flex;
  padding: 35px;
  background-color: #514f4d;
`;
const Left = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const FieldWrap = styled.div`
  border: 2px solid #f7eee3;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const Field = styled.input`
  border: none;
  outline: none;
  flex: 2px;
  height: 100%;
  padding: 10px;
  background-color: #514f4d;
  color: #f7eee3;
`;
const Button = styled.button`
  border: none;
  flex: 1px;
  background-color: #f7eee3;
  height: 100%;
  padding: 10px;
  cursor: pointer;
`;
const Sotial = styled.span`
  cursor: pointer;
  margin: 0 3px;
`;
const ContainerTwo = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Group = styled.div`
  background-color: color;
  display: flex;
  flex-direction: column;
  
  
`;
const GroupTitle = styled.div`
  text-align: start;
  font-weight:bold;
  padding:10px;
`;
const GroupContent = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  
  

  
`;
const GroupItem = styled.li`
 padding:10px;
 display: flex;
 align-items: center;
`
const ContainerThree = styled.div`
   display:flex;
   padding: 35px;
`
const LeftTwo = styled.div`
 flex:1;
`
const RightTwo = styled.div`
 flex:1;
 display:flex;
 justify-content:flex-end;
`
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
            <GroupItem>
              Our Story
            </GroupItem>
            <GroupItem>
              Reviews
            </GroupItem>
            
          </GroupContent>
        </Group>
        <Group>
        <GroupTitle>Categories</GroupTitle>
          <GroupContent>
            <GroupItem>
            Tops & Blouses
            </GroupItem>
            <GroupItem>
            Sweaters
            </GroupItem>
            <GroupItem>
            Pants
            </GroupItem>
            <GroupItem>
            Dresses
            </GroupItem>
            <GroupItem>
            Jackets
            </GroupItem>
            <GroupItem>
            Accessories
            </GroupItem>
          </GroupContent>
        </Group>
        <Group>
        <GroupTitle>User</GroupTitle>
          <GroupContent>
            <GroupItem>
              Login
            </GroupItem>
            <GroupItem>
              Chart
            </GroupItem>
          
          
          </GroupContent>
        </Group>
        <Group>
        <GroupTitle>Contact</GroupTitle>
          <GroupContent>
            <GroupItem>
              <LocationOn/> 622 Dixie Path , South Tobinchester 98336
            </GroupItem>
            <GroupItem>
              <Phone/> +1 234 56 78
            </GroupItem>
            <GroupItem>
            <Mail/> contact@lama.dev
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
