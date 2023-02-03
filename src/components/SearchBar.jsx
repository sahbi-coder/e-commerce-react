import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setSearchQuery, children, setIsFocused }) {
  function handleChange(e) {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      return setIsFocused(false);
    }
    setIsFocused(true);
  }
  return (
    <form
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <input
        id="search-bar"
        className="text"
        onInput={handleChange}
        label=""
        variant="outlined"
        placeholder="Search..."
        size="small"
        style={{ minWidth: "225px", height: 23 }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "black" }} />
      </IconButton>
      {children}
    </form>
  );
}
