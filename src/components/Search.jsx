import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const filterData = (query, data, isFocused) => {
  if (!isFocused) return [];
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.title.toLowerCase().includes(query));
  }
};

export default function Search({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dataFiltered = filterData(searchQuery, data,isFocused);
  useEffect(() => {
    const handler = () => {
      setIsFocused(false);
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsFocused={setIsFocused}
      >
        <div
          style={{
            padding: 3,
            position: "absolute",
            top: 40,
            zIndex: 500,
            borderRadius: 5,
            backgroundColor: "white",
            maxHeight: 400,
            overflowY: "scroll",
          }}
          className="search"
        >
          {dataFiltered.map((d) => (
            <Link
              to={`/product/${d._id}`}
              key={crypto.randomUUID()}
              className="link"
            >
              <div
                style={{
                  padding: 5,
                  justifyContent: "normal",
                  fontSize: 16,
                  cursor: "pointer",
                  borderRadius: 5,
                  width: "210px",
                  BorderColor: "green",
                  borderWidth: "10px",
                  backgroundColor: "white",
                }}
                className="searchItem"
              >
                {d.title}
              </div>
            </Link>
          ))}
        </div>
      </SearchBar>
    </>
  );
}
