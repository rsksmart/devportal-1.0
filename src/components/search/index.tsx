import React from 'react'
import {graphql, useStaticQuery} from "gatsby";
import InnerSearch from "./inner";

const Search = () => {
  const {search} = useStaticQuery(graphql`
    {
      search: localSearchPages {
        store
        index
      }
    }
  `);

  if (!search) return null;

  return (
    <InnerSearch search={search} />
  );
}

export default Search;
