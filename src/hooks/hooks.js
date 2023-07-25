import { useEffect, useState } from 'react'

export const useUrlState = () => {
    const [currentPage, setCurrentPage] = useState('');
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const page = queryParams.get('page');
      const searchTerm = decodeURIComponent(queryParams.get('q') || '');
      if (page && currentPage !== page) {
        setCurrentPage(page);
      }
  
      if (currentSearchTerm !== searchTerm) {
        setCurrentSearchTerm(searchTerm);
      }
  
    }, [window.location.search]);
  
    return {
      page: currentPage,
      q: currentSearchTerm
    };
  };
  