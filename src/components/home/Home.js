import React, { useEffect, useState, useMemo } from 'react';
import {
  Row,
  Col
} from 'react-bootstrap';
import Navbar from '../navbar/Navbar';
import Product from './Product';
import axios from 'axios';
// import PaginationComponent from '../pagination/pagination';
// import { useUrlState } from '../../hooks/hooks';
import './home.css';
import { camelCase } from 'lodash';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [q, setQ] = useState('');

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

  //If we need pagination
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

  const handleChange = (s) => {
    if(s.length === 0) return initialRendering(0);
    s = s.toLowerCase();
    setData(data.filter(movie => movie.name.toLowerCase().includes(s)));
    setQ(s);
  }

  const memoizedFetchData = useMemo(() => async (p) => {
    if (p <= 3) {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${p}.json`);
      const newData = await camelizeKeys(response?.data?.page["content-items"]?.content);
      return newData;
    }
  }, []);


  const loadMoreData = async (p) => {
    if (!isLoading && p <= 3 && p > 1) {
      setIsLoading(true);
      const newData = await memoizedFetchData(p);
      setData(prevData => [...prevData, ...newData]);
      setIsLoading(false);
    }
  };

  const initialRendering = async (p) => {
    const newData = await memoizedFetchData(1);
    setData(newData);
  };

  useEffect(() => {
    initialRendering(1);
  }, []);

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
            <Col lg={4} md={4} sm={4} className='productList'>
              <Product imageUrl={item?.posterImage} title={item.name} search={q} />
            </Col>
          )): <h2 className="emptyResults">No Results found! Please use different keyword to search</h2>
        }
        </Row>
      </div>
    </div>
    //below code is for paginations

    // {data.length > 0 && <Row className="productpagination">
    //   <PaginationComponent
    //     itemsCount={data?.length * 3}
    //     itemsPerPage={data?.length}
    //     currentPage={currentPage}
    //     pageButtonOnClick={paginationPageButtonOnClick}
    //   />
    // </Row>}
  );
};

export default HomePage;
