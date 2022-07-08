import React from "react";
import styled from "styled-components";

const GridItem = styled.div`
  border: 2px #514f4d solid;
  padding: 10px;
`;
const Title = styled.h4`
  text-align: start;
  font-size: 28px;
`;

const ProfileRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const ProfileRowTitle = styled.div`
  font-weight: bold;
`;
const ProfileRowInfo = styled.div``;
const ProfileRows = styled.div``;

function ProfileContainer({ user }) {
  return (
    <GridItem>
      <Title>Profile</Title>

      {!user.currentUser && "none"}
      {user.currentUser && (
        <ProfileRows>
          <ProfileRow>
            <ProfileRowTitle>Name</ProfileRowTitle>
            <ProfileRowInfo>
              {user.currentUser.name.split(" ")[0]}
            </ProfileRowInfo>
          </ProfileRow>
          <ProfileRow>
            <ProfileRowTitle>Last Name</ProfileRowTitle>
            <ProfileRowInfo>
              {user.currentUser.name.split(" ")[1]}
            </ProfileRowInfo>
          </ProfileRow>
          <ProfileRow>
            <ProfileRowTitle>Email</ProfileRowTitle>
            <ProfileRowInfo>{user.currentUser.email}</ProfileRowInfo>
          </ProfileRow>
        </ProfileRows>
      )}
    </GridItem>
  );
}

export default ProfileContainer;
