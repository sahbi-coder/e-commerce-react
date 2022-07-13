import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import { getProductsApiCall } from "../apiCalls";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import useMobile from "../hooks/useMobile";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(250px, 1fr));
  width: 100%;
  ${mobile({ width: "100vw", padding: 0 })}
`;
const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => <Product item={item} key={item._id} />)}
    </>
  );
}

const Products = ({ ctg, sort, filters, itemsPerPage }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const division = useSelector((state) => state.division.division);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const isMobile = useMobile();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;

    setItemOffset(newOffset);
  };

  const getProducts = async () => {
    const res = await getProductsApiCall(ctg, division);
    if (res.request.status === 200) {
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    getProducts();
    console.log(products);
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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  return (
    <OuterContainer>
      <Container>
        <Items currentItems={currentItems} />
      </Container>
      <ReactPaginate
        breakLabel="..."
        nextLabel={isMobile ? ">" : "next"}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel={isMobile ? "<" : "previous"}
        containerClassName={"paginationBttns"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={isMobile ? 1 : 3}
        pageRangeDisplayed={isMobile ? 1 : 3}
      />
    </OuterContainer>
  );
};

export default Products;
