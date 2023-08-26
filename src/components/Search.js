import React, { useRef } from "react";

const Search = (props) => {
  const searchRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();
    if (searchRef.current.value === "") return;
    props.setSearchTerm(searchRef.current.value);
  };

  return (
    <div className="p-4 font-Roboto">
      <h1 className="text-xl">Search</h1>
      <form onSubmit={handleForm}>
        <div className="flex rounded-xl overflow-hidden bg-white ">
          <input
            type="text"
            name="search"
            id="search"
            ref={searchRef}
            onChange={handleForm}
            className="p-2 w-full text-lg  border-none outline-none"
            placeholder="Example Yaounde"
          />
          <button type="submit" className="bg-primary-400 p-2 text-white">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
