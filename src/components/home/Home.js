/**Imports modules and components */
import React, { useEffect, useState, useMemo } from 'react';
import {
  Row,
  Col
} from 'react-bootstrap';
import Navbar from '../navbar/Navbar';
import Product from './Product';
import axios from 'axios';
import './home.css';
import { camelCase } from 'lodash';

/**For Normal Pagination */
// import PaginationComponent from '../pagination/pagination';
// import { useUrlState } from '../../hooks/hooks';

const HomePage = () => {

  /**Handle statemanagements */
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [q, setQ] = useState('');

  /**Cmaelize key valye of array and objects */
  const camelizeKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => camelizeKeys(v));
    } if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: camelizeKeys(obj[key]),
        }),
        {},
      );
    }
    return obj;
  }

  //If we need custom pagination

  // const paginationPageButtonOnClick = (pageNumber) => {
  //   const queryParams = {};
  //   if (q) {
  //     queryParams.q = q
  //   };
  //   queryParams.page = pageNumber.toString();
  //   navigate({
  //     pathname: location.pathname,
  //     search: '?' + new URLSearchParams(queryParams).toString()
  //   })
  // }

  // if we need pagination we can use below code
  // useEffect(() => {
  //   fetchData(page || '1'); // Call the API function
  // }, [page]);

    // const paginationComponents = () => {
    // {data.length > 0 && <Row className="productpagination">
    //   <PaginationComponent
    //     itemsCount={data?.length * 3}
    //     itemsPerPage={data?.length}
    //     currentPage={currentPage}
    //     pageButtonOnClick={paginationPageButtonOnClick}
    //   />
    // </Row>}
  // }

  /**
   * 
   * @param {handle search results }
   * @returns 
   * @author Shubham Singh
   */

  const handleChange = (s) => {
    if(s.length === 0) { 
      initialRendering(0);
      setQ('');
      return undefined;
    };
    s = s.toLowerCase();
    setData(data.filter(movie => movie.name.toLowerCase().includes(s)));
    setQ(s);
  }

  /**handle memoized API call */
  const memoizedFetchData = useMemo(() => async (p) => {
    if (p <= 3) {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${p}.json`);
      const newData = await camelizeKeys(response?.data?.page["content-items"]?.content);
      return newData;
    }
  }, []);

  /**API call after scroll */

  const loadMoreData = async (p) => {
    if (!isLoading && p <= 3 && p > 1) {
      setIsLoading(true);
      const newData = await memoizedFetchData(p);
      setData(prevData => [...prevData, ...newData]);
      setIsLoading(false);
    }
  };

  /** Initial page render */
  const initialRendering = async (p) => {
    const newData = await memoizedFetchData(1);
    setData(newData);
  };

  useEffect(() => {
    initialRendering(1);
  }, []);


  /** handle scroll and call the API when its reached on the bottom */
  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        !reachedBottom &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setReachedBottom(true);
        loadMoreData(pageNumber + 1);
        setPageNumber((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, reachedBottom]);


  /** Adding flag to check scroll reached to bottom and call the API */

  useEffect(() => {
    if (reachedBottom) {
      loadMoreData(pageNumber).then(() => {
        setReachedBottom(false);
      });
    }
  }, [reachedBottom, pageNumber]);

  return (
    <div className='container'>
      <Navbar handleChange={handleChange} />
      <div className="productWrapContainer " >
        <Row>
          {data.length > 0 ? data.map((item) => (
            <Col lg={3} md={4} sm={4} className='productList'>
              <Product imageUrl={item?.posterImage} title={item.name} search={q} />
            </Col>
          )): <h2 className="emptyResults">No Results found! Please use different keyword to search</h2>
        }
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
