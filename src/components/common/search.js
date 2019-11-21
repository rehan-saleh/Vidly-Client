import React from "react";

const Search = ({ onSearch }) => {
  const handleChange = ({ currentTarget: input }) => {
    onSearch(input.value);
  };

  return (
    <React.Fragment>
      <input
        className="form-control my-2"
        placeholder="Search..."
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default Search;
