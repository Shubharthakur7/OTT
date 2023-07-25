import { useEffect, useState } from 'react';
import { camelCase } from 'lodash';

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

/**Cmaelize key valye of array and objects */
export const camelizeKeys = (obj) => {
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
