import {Field, Form, Formik} from "formik";
import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch';
import {Link} from "gatsby";

const InnerSearch = ({search}: { search: any }) => {
  const [query, setQuery] = useState<null | string>(null);
  const searchRef = useRef(null);
  const [focus, setFocus] = useState(false);

  const results = useFlexSearch(query, search.index, search.store);

  const handleClick = (event: any) => {
    // @ts-ignore
    if (!searchRef.current?.contains(event.target)) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  }, []);

  return (
    <div className="search position-relative mb-4" ref={searchRef}>
      <Formik
        initialValues={{query: ''}}
        onSubmit={(values, {setSubmitting}) => {
          setQuery(values.query)
          setSubmitting(false)
        }}
      >
        {() => (
          <Form className="search__form position-relative">
            <Field
              onFocus={() => setFocus(true)}
              className="search__input form-control"
              placeholder="Search"
              name="query"
            />
            <button className="search__button position-absolute btn btn-white" type="submit">Search</button>
          </Form>
        )}
      </Formik>
      {results && !!results.length && focus && (
        <div className="search-results position-absolute border border-1 rounded-3">
          <ul className="search-results__list py-lg-4 px-lg-4 p-md-3 px-4 py-4">
            {results.map((result: any) => (
              <li className="search-results__item" key={result.id}>
                <Link className="search-results__link" to={result.pageSlug}>{result.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default InnerSearch;
