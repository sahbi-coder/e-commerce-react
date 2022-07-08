import React from 'react'
import styled from 'styled-components';


const WishlistRows = styled.div``;
const WishlistRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 5px 0;
  `;
  const GridItem = styled.div`
    border: 2px #514f4d solid;
    padding: 10px;
  `;
  const Title = styled.h4`
    text-align: start;
    font-size: 28px;
  `;
const WishlistImage = styled.img`
  width: 80px;
  height: 100px;
`;
const WishlistDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const WishlistTitle = styled.div``;
const WishlistPrice = styled.div``;

function WishlistContainer({wishlist,user}) {
  return (
    
    <GridItem>
    <Title>Wishlist</Title>

    {(!user.currentUser || wishlist.products.length === 0) && "empty"}
    <WishlistRows>
      {user.currentUser &&
        wishlist.products.map((item, index) => {
          return (
            <WishlistRow key={item._id}>
              <WishlistImage src={item.img} />
              <WishlistDesc>
                <WishlistTitle>{item.title}</WishlistTitle>
                <WishlistPrice>${item.price}</WishlistPrice>
              </WishlistDesc>
            </WishlistRow>
          );
        })}
    </WishlistRows>
  </GridItem>
  )
}

export default WishlistContainer