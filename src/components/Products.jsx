import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import { getProducts } from "../apiCalls";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(250px, 1fr));
  width: 100%;
  ${mobile({ width: "100vw", padding: 0 })}
`;

const Products = ({ ctg, sort, filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const division = useSelector((state) => state.division.division);

  useEffect(() => {
    getProducts(ctg, division, setProducts);
  }, [ctg, division]);
  useEffect(() => {
    if (filters && filters.size === "all" && filters.color === "all") {
      ctg && setFilteredProducts(products);
      return;
    }
    if (filters && filters.size === "all") {
      ctg &&
        setFilteredProducts(
          products.filter((prod) => {
            return prod["color"].includes(filters.color);
          })
        );
      return;
    }
    if (filters && filters.color === "all") {
      ctg &&
        setFilteredProducts(
          products.filter((prod) => {
            return prod["size"].includes(filters.size);
          })
        );
      return;
    }

    ctg &&
      filters &&
      setFilteredProducts(
        products.filter((prod) => {
          return Object.entries(filters).every(([key, value]) => {
            return prod[key].includes(value);
          });
        })
      );
  }, [ctg, filters, products]);
  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) =>
            -new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime()
        )
      );
    }
    if (sort === "ASD") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
    if (sort === "DSD") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {ctg
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
