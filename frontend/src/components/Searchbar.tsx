import { ReactiveVar, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CURRENT_FILTERS, GET_HASMORE, GET_REFETCH } from "../App";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import Select from "./Select";
import BookFilters from "./types/BookFilters";
import refetchType from "./types/refetchType";
import setHasmoreType from "./types/setHasmore";

function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const { data: refetchResult } = useQuery<refetchType>(GET_REFETCH);
  const { data: hasMoreResult } = useQuery<setHasmoreType>(GET_HASMORE);
  const { data: currentFiltersResult } = useQuery<{
    currentFiltersFunction: ReactiveVar<BookFilters>;
  }>(GET_CURRENT_FILTERS);

  function handleChange() {
    if (refetchResult && hasMoreResult && currentFiltersResult) {
      //Updating the current filters by first retreiving the old filters then inserting the new filters in the function provided by apollo for updating reactive variables.
      const oldFilters = currentFiltersResult.currentFiltersFunction();
      currentFiltersResult.currentFiltersFunction({
        ...oldFilters,
        title: searchValue,
      });
      refetchResult.refetchFunction({
        filters: currentFiltersResult.currentFiltersFunction(),
      });
      hasMoreResult.hasMoreFunction(true);
    }
  }
  return (
    <header role={"banner"} className="w-full flex flex-col items-center">
      <h1 className="text-6xl pt-3 pb-10 font-mono font-semibold text-primary">
        BookHunter
      </h1>
      <div className="flex justify-between w-full max-w-xs">
        <input
          id="searchInput"
          tabIndex={1}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search for title"
          aria-label="title to search for"
          autoComplete="off"
          className="bg-white text-black input input-bordered placeholder-grey focus:outline-accent-focus border-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChange();
            }
          }}
        />
        <button
          id="searchButton"
          tabIndex={2}
          onClick={() => handleChange()}
          type="submit"
          className="btn btn-outline btn-primary focus:outline-accent-focus"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChange();
            }
          }}
        >
          Search
        </button>
      </div>
      <label htmlFor="multiSlider" className="pt-6 pb-3">
        Year
      </label>
      <MultiRangeSlider min={-2022} max={2022} onChange={() => {}} />
      <div className="flex flex-row items-center w-1/2 justify-evenly pt-14">
        <Select></Select>
      </div>
    </header>
  );
}
export default Searchbar;
