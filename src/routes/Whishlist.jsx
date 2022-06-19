import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import { mobile } from "../responsive";
import { deleteById } from "../redux/wishlistSlice";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  ${mobile({ flexDirection: "column", width: "100vw" })};
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
  margin: 5px 0;
  width: 100%;
`;

const Left = styled.div`
  flex: 1;
  ${mobile({ display:'flex',justifyContent:'center'})};
`;
const Right = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${mobile({ alignItems:'center'})};
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const ProductName = styled.div`
padding: 5px;

${mobile({ justifyContent:'center',display:'flex',width:'250px'})};
`;
const ProductId = styled.div`
padding: 5px;
${mobile({ justifyContent:'center',display:'flex'})};
`;
const Image = styled.img`

height: 250px;
`;
const Buttons = styled.div`
 ${mobile({ justifyContent:'center',display:'flex'})};
`;

function Whishlist() {
  const { user, whishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeFromDbList = async (id) => {
    if (user.currentUser) {
      try {
        let res = await userRequest.get(
          "/wishlists/find/" + user.currentUser._id
        );

        const temp = res.data.products.reduce((pre, acc) => {
          if (acc._id === id) {
            return pre;
          }
          pre.push(acc);
          return pre;
        }, []);
        await userRequest.put("/wishlists/" + res.data._id, {
          ...res.data,
          products: temp,
        });
        dispatch(deleteById(id));
      } catch {}
    }
  };
  return (
    <>
      {user.currentUser && (
        <Container>
          {whishlist.products.map((prod) => {
            return (
              <>
                <Product>
                  <Left>
                    <Image src={prod.img} />
                  </Left>
                  <Right>
                    <ProductName>
                      <b>Product: </b> {prod.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b> {prod._id}
                    </ProductId>
                    <Buttons>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${prod._id}`);
                        }}
                      >
                        add to cart
                      </Button>

                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromDbList(prod._id);
                        }}
                      >
                        delete
                      </Button>
                    </Buttons>
                  </Right>
                </Product>
                <Hr />
              </>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default Whishlist;
